import { IUser } from '../Iuser.entity';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user', timestamps: true })
export class UserSchema extends Document implements IUser {
  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;
}
