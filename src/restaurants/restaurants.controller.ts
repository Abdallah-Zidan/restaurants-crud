import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SearchRestaurantsQuery } from './dto/search.dto';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { restaurantToDto } from './transformers/restaurant';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  async create(@Body() body: RestaurantDto) {
    return restaurantToDto(await this.restaurantService.create(body));
  }

  @Get()
  async getAll(@Query() query: SearchRestaurantsQuery) {
    return this.restaurantService.all(query);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const restaurant = await this.restaurantService.find(id);
    if (restaurant) return restaurantToDto(restaurant);
    throw new NotFoundException();
  }
}
