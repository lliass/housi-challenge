import { Injectable } from '@nestjs/common';
import {
  BusyDatesParamRequestDTO,
  BusyDatesQueryRequestDTO,
} from './property.dto';

@Injectable()
export class PropertyService {
  async getBusyDates(
    param: BusyDatesParamRequestDTO,
    query: BusyDatesQueryRequestDTO,
  ): Promise<string[]> {
    return [];
  }
}
