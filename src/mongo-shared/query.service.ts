import { BadRequestException, Injectable } from '@nestjs/common';
import { NearbyQuery } from './dto/nearby.dto';
import { PaginationQuery } from './dto/pagination.dto';
import { Model, Document } from 'mongoose';

@Injectable()
export class QueryService {
  private geoSpatialAttributes: string[] = [];

  setGeospatialAttributes(attrs: string[]) {
    this.geoSpatialAttributes = attrs;
  }

  buildQuery<T extends object>(query: T) {
    return this.parseQuery(query);
  }

  async paginate<T extends PaginationQuery, D extends Model<Document>>(
    query: T,
    model: D,
    transformFn?: (document: any) => any | Promise<any>,
  ) {
    const { page, perPage } = query;
    transformFn = transformFn ?? ((doc) => doc);
    const data = await model
      .find(query)
      .limit(perPage)
      .skip((page - 1) * perPage)
      .transform(transformFn);

    return this.withPaginationMeta(data, query);
  }

  withPaginationMeta(data: any[], { page, perPage }: PaginationQuery) {
    return {
      data,
      count: data.length,
      perPage,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async getById<T extends Document>(id: string, model: Model<T>): Promise<T> {
    return model.findOne({ _id: id });
  }

  async getByIdOrSlug<T extends Document>(
    id: string,
    model: Model<T>,
  ): Promise<T> {
    const query = this.vaidObjectId(id)
      ? { $or: [{ _id: id }, { slug: id }] }
      : { slug: id };
    return model.findOne(query);
  }

  private vaidObjectId(id: string) {
    return id.match(/^[0-9a-fA-F]{24}$/);
  }

  private parseQuery(query: object) {
    const filters: any = {};
    for (const [key, value] of Object.entries(query)) {
      if (key === '$near') {
        filters[value.attr] = this.buildNearFilter(value);
      } else filters[key] = query[key];
    }
    return filters;
  }

  private buildNearFilter(query: NearbyQuery) {
    //! if the target attribute doesn't allow geospatial queries then
    //! throws bad request exception to avoid quering a non geoJson attribute by mistake
    if (!this.geoSpatialAttributes.includes(query.attr))
      throw new BadRequestException([
        'the near by attribute is not a location',
      ]);
    return {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [query.long, query.lat],
        },
        $maxDistance: query.dist * 1000,
      },
    };
  }
}
