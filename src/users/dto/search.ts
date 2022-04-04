// import { IsString, Length } from 'class-validator';
import { PaginationQuery } from 'src/mongo-shared/dto/pagination.dto';

export class UsersSearchQuery extends PaginationQuery {
  //* here any allowed attributes to filter with can be added
  //   @IsString()
  //   @Length(1, 255)
  //   name: string;
}
