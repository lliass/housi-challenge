import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '../infra/env/env.module';
import {
  MONGO_DB_HOUSI_CHALLENGE,
  MONGO_DB_CONNECTION_URI,
} from '../infra/persistence/mongo-db/assets/constants/constants';
import { MongoDbModule } from '../infra/persistence/mongo-db/mongo-db.module';

const relativeRootDir = `${__dirname}/../..`;

@Module({
  imports: [
    EnvModule.setup({
      isGlobal: true,
      envFilePath: `${relativeRootDir}/.env`,
    }),

    MongoDbModule.setup([], {
      connectionUri: MONGO_DB_CONNECTION_URI,
      connectionName: MONGO_DB_HOUSI_CHALLENGE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
