import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 *! note: using envrironment variables directly for simplicity but configuration
 *! service is a better aproach to manage configurations
 */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    RestaurantsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
