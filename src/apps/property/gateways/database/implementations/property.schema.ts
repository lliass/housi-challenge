import { IProperty, PropertyInformations, Resident } from '../Iproperty.entity';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'property', timestamps: true })
export class PropertySchema extends Document implements IProperty {
  @Prop({ type: Object, required: true })
  property: PropertyInformations;

  @Prop({ type: Date, required: true })
  checkIn: Date;

  @Prop({ type: Date, required: true })
  checkOut: Date;

  @Prop({ type: Array, required: true })
  residents: Resident[];
}
