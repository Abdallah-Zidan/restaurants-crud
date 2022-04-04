import { RestaurantDto } from '../dto/restaurant.dto';
import { Restaurant } from '../schemas/restaurant.schema';
import { dtoToLocation, locationToDto } from './location';
export function restaurantToDto({
  name,
  id,
  slug,
  cuisine,
  location,
  createdAt,
  updatedAt,
}: Restaurant) {
  return {
    id,
    name,
    slug,
    location: location ? locationToDto(location) : location,
    cuisine,
    createdAt,
    updatedAt,
  };
}
export function restaurantsToCollectionDto(restaurants: Restaurant[]) {
  return restaurants.map(restaurantToDto);
}

export function dtoToRestaurant(restaurant: RestaurantDto) {
  return {
    ...restaurant,
    location: dtoToLocation(restaurant.location),
  };
}
