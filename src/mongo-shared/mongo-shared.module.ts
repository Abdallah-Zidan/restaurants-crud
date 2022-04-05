import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
/**
 ** this shared module abstracts some common mongodb related stuff that can be
 ** used across the other modules
 */
@Module({
  providers: [QueryService],
  exports: [QueryService],
})
export class MongoSharedModule {}
