import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/:id/busy-dates')
  async getBusyDates(): Promise<any> {
    return;
  }
}
