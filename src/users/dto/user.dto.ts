import { IsArray, IsDefined, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(4, 255)
  fullName: string;

  @IsArray()
  @IsDefined()
  favoriteCuisines: string[];
}
