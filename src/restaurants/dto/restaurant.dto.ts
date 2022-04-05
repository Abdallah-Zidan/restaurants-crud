import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Length,
  ValidateNested,
  Validate,
} from 'class-validator';
import { IsValidObjectId } from 'src/mongo-shared/custom-validators/valid-object-id';
import { LocationDto } from './location.dto';

export class RestaurantDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  cuisine: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsString()
  @Validate(IsValidObjectId) //* must be a valid object id
  user: string;
}
