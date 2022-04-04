import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { DEFAULT_DISTANCE_IN_KM } from 'src/constants';

export class NearbyQuery {
  @IsNumber()
  @Max(90)
  @Min(-90)
  @Transform((params) => parseFloat(params.value))
  lat: number;

  @IsNumber()
  @Max(180)
  @Min(-180)
  @Transform((params) => parseFloat(params.value))
  long: number;

  @IsNumber()
  @IsOptional()
  @Max(1000)
  @Min(1)
  @Transform((params) => parseInt(params.value))
  dist = DEFAULT_DISTANCE_IN_KM;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  attr = 'location';
}
