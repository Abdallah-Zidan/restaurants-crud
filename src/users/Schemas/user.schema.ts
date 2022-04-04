import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { RestaurantDocument } from 'src/restaurants/schemas/restaurant.schema';
@Schema()
export class User {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: [String], required: true })
  favoriteCuisines: string[];

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: 'Restaurant' })
  restaurants: RestaurantDocument[];

  createdAt: string;
  updatedAt: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
export type UserDocument = User & Document;
