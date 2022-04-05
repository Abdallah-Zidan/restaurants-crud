import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RestaurantDto } from './dto/restaurant.dto';

import {
  dtoToRestaurant,
  restaurantsToCollectionDto,
} from './transformers/restaurant';
import { SearchRestaurantsQuery } from './dto/search.dto';
import { QueryService } from '../mongo-shared/query.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    private queryService: QueryService,
    private userService: UsersService,
  ) {
    this.restaurantModel.ensureIndexes();
    //* configure query service to accept geospatial queries on the attribute location
    this.queryService.setGeospatialAttributes(['location']);
  }

  async create(body: RestaurantDto) {
    const user = await this.findUserOrThrow(body.user);
    const restaurant = await this.restaurantModel.create(dtoToRestaurant(body));
    //* add the created restaurant to user owned restaurants
    user.restaurants.push(restaurant);
    await user.save();
    //* if elasticsearch is used here might be a good place to index the created
    return restaurant;
  }

  async find(id: string) {
    return await this.queryService.getByIdOrSlug(id, this.restaurantModel);
  }

  async all(query: SearchRestaurantsQuery) {
    query = this.queryService.buildQuery(query);
    return this.queryService.paginate(
      query,
      this.restaurantModel,
      restaurantsToCollectionDto,
    );
  }

  //! this method throw a validation error in case user doesn't exist
  private async findUserOrThrow(id: string) {
    const user = await this.userService.find(id);
    if (!user) throw new UnprocessableEntityException(["user doesn't exist"]);
    return user;
  }
}
