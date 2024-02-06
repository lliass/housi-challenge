import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '../infra/env/env.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';

const relativeRootDir = `${__dirname}/../..`;

@Module({
  imports: [
    EnvModule.setup({
      isGlobal: true,
      envFilePath: `${relativeRootDir}/.env`,
    }),

    AuthModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
