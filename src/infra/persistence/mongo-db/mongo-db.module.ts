import { DynamicModule, Module } from '@nestjs/common';
import {
  MongooseModule,
  MongooseModuleOptions,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ClassConstructor, DBModuleOptions } from './assets/types/config.type';

@Module({})
export class MongoDbModule {
  static registeredSchemas: ClassConstructor[] = [];

  static setup(
    schemaModels: ClassConstructor[],
    options?: DBModuleOptions,
  ): DynamicModule {
    MongoDbModule.registeredSchemas.push(...schemaModels);

    const { connectionUri, connectionName } = options;

    const module: DynamicModule = {
      module: MongoDbModule,
      imports: [
        // Setup Connection
        MongooseModule.forRootAsync({
          connectionName: connectionName,
          useFactory: () =>
            ({
              uri: connectionUri,
              authSource: 'admin',
            } as MongooseModuleOptions),
        }),

        // Setup Schemas
        MongooseModule.forFeatureAsync(
          schemaModels.map((schemaModel) => {
            const schema = SchemaFactory.createForClass(schemaModel);

            return {
              name: schemaModel.name,
              useFactory: () => schema,
            };
          }),
          connectionName,
        ),
      ],
      exports: [MongooseModule],
    };

    return module;
  }
}
