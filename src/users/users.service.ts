import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './Schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryService } from 'src/mongo-shared/query.service';
import { UserDto } from './dto/user.dto';
import { usersToDtoCollection } from './transformers/user';
import { UsersSearchQuery } from './dto/search';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private queryService: QueryService,
  ) {}

  async create(body: UserDto) {
    return this.userModel.create(body);
  }

  async find(id: string) {
    return this.queryService.getById(id, this.userModel);
  }

  async all(query: UsersSearchQuery) {
    return this.queryService.paginate(
      query,
      this.userModel,
      usersToDtoCollection,
    );
  }

  async byCuisine(cuisine: string) {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurants',
          foreignField: '_id',
          as: 'ownedRestaurants',
        },
      },
      {
        $match: {
          $or: [
            {
              ownedRestaurants: {
                $elemMatch: {
                  cuisine: {
                    $in: [cuisine],
                  },
                },
              },
            },
            {
              favoriteCuisines: {
                $in: [cuisine],
              },
            },
          ],
        },
      },
    ]);

    return usersToDtoCollection(users);
  }
}
