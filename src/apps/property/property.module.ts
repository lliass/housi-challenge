import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './gateways/database/implementations/property.repository';
import { PropertySchema } from './gateways/database/implementations/property.schema';
import { MongoDbModule } from 'src/infra/persistence/mongo-db/mongo-db.module';
import {
  MONGO_DB_CONNECTION_URI,
  MONGO_DB_HOUSI_CHALLENGE,
} from 'src/infra/persistence/mongo-db/assets/constants/constants';

@Module({
  imports: [
    MongoDbModule.setup([PropertySchema], {
      connectionUri: MONGO_DB_CONNECTION_URI,
      connectionName: MONGO_DB_HOUSI_CHALLENGE,
    }),
  ],
  providers: [PropertyService, PropertyRepository],
  controllers: [PropertyController],
})
export class PropertyModule {}
