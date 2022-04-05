import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(90)
  @Min(-90)
  @Transform((params) => parseFloat(params.value))
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Max(180)
  @Min(-180)
  @Transform((params) => parseFloat(params.value))
  long: number;
}
