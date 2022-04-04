import { LocationDto } from '../dto/location.dto';
import { Location } from '../schemas/location.schema';

export function locationToDto(location: Location) {
  const dto = new LocationDto();
  const [long, lat] = location.coordinates;
  return Object.assign(dto, { long, lat });
}

export function dtoToLocation(location: LocationDto) {
  const { lat, long } = location;
  return {
    type: 'Point',
    coordinates: [long, lat],
  };
}
