import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoSharedModule } from 'src/mongo-shared/mongo-shared.module';
import { User, UserSchema } from './Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    MongoSharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
