import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDocument } from 'src/users/Schemas/user.schema';
import { LocationSchema, Location } from './location.schema';

@Schema()
export class Restaurant {
  id?: string;
  @Prop({ type: String, required: true })
  name: string;

  //* append unique slug to each document using restaurant name
  @Prop(raw({ type: String, slug: ['name'], unique: true }))
  slug: string;

  @Prop({ type: String, required: true })
  cuisine: string;

  @Prop({ type: LocationSchema, required: true, index: '2dsphere' })
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  createdAt: string;
  updatedAt: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

//* append timestamps to each document (createdAt,updatedAt)
RestaurantSchema.set('timestamps', true);
export type RestaurantDocument = Restaurant & mongoose.Document;
