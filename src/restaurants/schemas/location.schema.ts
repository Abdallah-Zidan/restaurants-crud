import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Location {
  @Prop({ type: String, required: true, enum: ['Point'], default: 'Point' })
  type?: 'Point' | 'Polygon';

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
