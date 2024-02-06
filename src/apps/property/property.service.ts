import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  BusyDatesParamRequestDTO,
  BusyDatesQueryRequestDTO,
} from './property.dto';
import { PropertyRepository } from './gateways/database/implementations/property.repository';

@Injectable()
export class PropertyService {
  constructor(private propertyRepository: PropertyRepository) {}

  async getBusyDates(
    param: BusyDatesParamRequestDTO,
    query: BusyDatesQueryRequestDTO,
  ): Promise<string[]> {
    const { id } = param;
    const { start: startDate, end: endDate } = query;

    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    const illogicalDateRange =
      endDateFormatted.getTime() - startDateFormatted.getTime() < 0;

    if (illogicalDateRange) {
      throw new BadRequestException('Illogical date range');
    }

    const datesParamsHaveBeenSent = startDate && endDate;

    const queryDateParams: { startDate: Date; endDate?: Date } =
      datesParamsHaveBeenSent
        ? { startDate: startDateFormatted, endDate: endDateFormatted }
        : { startDate: new Date() };

    const properties = await this.propertyRepository.findByRangeDate({
      id,
      ...queryDateParams,
    });

    if (!properties.length) {
      throw new NotFoundException(
        'No properties were found within this date range or property id',
      );
    }

    const blockedDates = properties.reduce((dates: string[], property) => {
      const checkInFormatted = property.checkIn.toISOString().slice(0, 10);
      const checkOutFormatted = property.checkOut.toISOString().slice(0, 10);

      dates.push(checkInFormatted, checkOutFormatted);

      return dates;
    }, []);

    return blockedDates;
  }
}
