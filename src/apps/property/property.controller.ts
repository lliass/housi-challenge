import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import {
  BusyDatesParamRequestDTO,
  BusyDatesQueryRequestDTO,
} from './property.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id/busy-dates')
  async getBusyDates(
    @Param() param: BusyDatesParamRequestDTO,
    @Query() query: BusyDatesQueryRequestDTO,
  ): Promise<string[]> {
    return this.propertyService.getBusyDates(param, query);
  }
}
