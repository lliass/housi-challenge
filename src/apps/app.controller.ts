import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/assets/metadatas/public.metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async getHealthCheck(): Promise<string> {
    return this.appService.getHealthCheck();
  }
}
