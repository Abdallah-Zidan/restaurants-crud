import { UserDocument } from '../Schemas/user.schema';

//* the goal of this function is to extract and transform result to send
//* only the needed data to client
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
