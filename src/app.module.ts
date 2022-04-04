import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
