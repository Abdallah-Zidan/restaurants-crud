import { Logger } from '@nestjs/common';
import { plainToInstance, Transform } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { NearbyQuery } from '../../mongo-shared/dto/nearby.dto';
import { PaginationQuery } from '../../mongo-shared/dto/pagination.dto';

/**
 ** DTO that specifies the shape of restaurants queries
 ** you can add extra properties with their validation rules
 ** and query service will transform them into mongo query
 */
export class SearchRestaurantsQuery extends PaginationQuery {
  // @IsString()
  // @IsOptional()
  // @Length(2, 100)
  // name?: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  cuisine?: string;

  @IsOptional()
  @Transform((param) => parseJson(param.value))
  @IsObject()
  @IsNotEmptyObject()
  @Transform((param) => plainToInstance(NearbyQuery, param.value))
  @ValidateNested()
  $near?: NearbyQuery; //*must be a valid nearby query as specified in NearbyQuery class
}

function parseJson(json: string | object) {
  try {
    return typeof json === 'object' ? json : JSON.parse(json);
  } catch (error) {
    Logger.error(
      "json couldn't be parsed : " + error.message,
      'SearchRestaurantsQuery',
    );
    return {};
  }
}
