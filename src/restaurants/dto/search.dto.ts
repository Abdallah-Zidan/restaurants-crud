import { Logger } from '@nestjs/common';
import { plainToInstance, Transform } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NearbyQuery } from '../../mongo-shared/dto/nearby.dto';
import { PaginationQuery } from '../../mongo-shared/dto/pagination.dto';

export class SearchRestaurantsQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  cuisine?: string;

  @IsOptional()
  @Transform((param) => parseJson(param.value))
  @IsObject()
  @IsNotEmptyObject()
  @Transform((param) => plainToInstance(NearbyQuery, param.value))
  @ValidateNested()
  $near?: NearbyQuery;
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
