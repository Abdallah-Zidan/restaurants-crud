import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './Schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryService } from 'src/mongo-shared/query.service';
import { UserDto } from './dto/user.dto';
import { usersToDtoCollection } from './transformers/user';
import { UsersSearchQuery } from './dto/search';
import { PaginationQuery } from 'src/mongo-shared/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private queryService: QueryService,
  ) {
    this.userModel.ensureIndexes();
  }

  async create(body: UserDto) {
    return this.userModel.create(body);
  }

  async find(id: string) {
    return this.queryService.getById(id, this.userModel);
  }

  async all(query: UsersSearchQuery) {
    return this.queryService.paginate(
      query,
      this.userModel,
      usersToDtoCollection, //* this will be used to transform query result into dtos
    );
  }

  async remove(id: string) {
    return this.queryService.removeById(id, this.userModel);
  }

  async byCuisine(cuisine: string, { page, perPage }: PaginationQuery) {
    /**
     ** an aggregate to get user if they have the provided cuisine in their favorite cuisine
     ** or they own a restaurant with that cuisine
     ** note : this could be abstracted to query service in a generic reusable way but it's only
     ** used in that request and might be simpler to create the query directly here
     */
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurants',
          foreignField: '_id',
          as: 'ownedRestaurants',
        },
      },
      {
        $match: {
          $or: [
            {
              ownedRestaurants: {
                $elemMatch: {
                  cuisine: {
                    $in: [cuisine],
                  },
                },
              },
            },
            {
              favoriteCuisines: {
                $in: [cuisine],
              },
            },
          ],
        },
      },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);

    //* append pagination meta data to the result
    return this.queryService.withPaginationMeta(usersToDtoCollection(users), {
      page,
      perPage,
    });
  }
}
