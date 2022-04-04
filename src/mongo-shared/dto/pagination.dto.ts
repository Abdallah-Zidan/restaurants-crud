import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants';

export class PaginationQuery {
  @IsNumber()
  @IsOptional()
  @Max(100)
  @Min(1)
  @Transform((value) => parseInt(value.value))
  perPage: number = DEFAULT_PAGE_SIZE;

  @IsNumber()
  @IsOptional()
  @Max(1000)
  @Min(1)
  @Transform((value) => parseInt(value.value))
  page: number = DEFAULT_PAGE;
}
