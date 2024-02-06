import { IProperty } from './Iproperty.entity';

type RangeDatesQuery = {
  id: string;
  startDate: Date;
  endDate?: Date;
};

interface IPropertyRepository {
  findByRangeDate(query: RangeDatesQuery): Promise<IProperty[]>;
}

export { IPropertyRepository, RangeDatesQuery };
