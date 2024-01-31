import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT);
}
bootstrap();
