import { IsNotEmpty, IsNumber } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;
  @IsNumber()
  @IsNotEmpty()
  long: number;
}
