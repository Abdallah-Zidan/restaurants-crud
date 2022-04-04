import { UserDocument } from '../Schemas/user.schema';

export function userToDto({
  id,
  fullName,
  favoriteCuisines,
  createdAt,
  updatedAt,
  restaurants,
}: UserDocument) {
  return {
    id,
    fullName,
    favoriteCuisines,
    createdAt,
    updatedAt,
    restaurants,
  };
}

export function usersToDtoCollection(users: UserDocument[]) {
  return users.map(userToDto);
}
