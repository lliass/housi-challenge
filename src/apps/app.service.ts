import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHealthCheck(): Promise<string> {
    return 'OK';
  }
}
