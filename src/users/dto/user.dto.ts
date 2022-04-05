import {
  IsArray,
  IsDefined,
  // IsNotEmptyObject,
  IsString,
  Length,
} from 'class-validator';

//* this dto specifie sthe shape of the user creation body + apply validation rules
export class UserDto {
  @IsString()
  @Length(2, 100)
  fullName: string;

  @IsArray()
  @IsDefined()
  @IsString({ each: true })
  @Length(2, 100, { each: true })
  // @IsNotEmptyObject()
  favoriteCuisines: string[];
  //* note : allowed to have an empty array of favorite cuisine
  //* if it's not the case then @IsNotEmptyObject() validation rule must be added
}
