import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PropertySchema } from './property.schema';
import { IPropertyRepository, RangeDatesQuery } from '../Iproperty.repository';
import { MONGO_DB_HOUSI_CHALLENGE } from '../../../../../infra/persistence/mongo-db/assets/constants/constants';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(PropertySchema.name, MONGO_DB_HOUSI_CHALLENGE)
    private repository: Model<PropertySchema>,
  ) {
    this.repository.schema.index({ checkIn: 1 });
    this.repository.schema.index({ checkOut: 1 });
  }

  async findByRangeDate(
    queryParams: RangeDatesQuery,
  ): Promise<PropertySchema[]> {
    const { id, startDate, endDate } = queryParams;

    const idFormatted = new ObjectId(id);

    const query: any = {
      'property._id': idFormatted,
      checkIn: { $gte: startDate },
    };

    if (endDate) {
      query.checkOut = { $lte: endDate };
    }

    const result = await this.repository.find(query);

    return result;
  }
}
