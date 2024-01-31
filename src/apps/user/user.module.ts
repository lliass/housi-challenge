import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './gateways/database/implementations/user.repository';
import { MongoDbModule } from 'src/infra/persistence/mongo-db/mongo-db.module';
import { UserSchema } from './gateways/database/implementations/user.schema';
import {
  MONGO_DB_CONNECTION_URI,
  MONGO_DB_HOUSI_CHALLENGE,
} from 'src/infra/persistence/mongo-db/assets/constants/constants';

@Module({
  imports: [
    MongoDbModule.setup([UserSchema], {
      connectionUri: MONGO_DB_CONNECTION_URI,
      connectionName: MONGO_DB_HOUSI_CHALLENGE,
    }),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
