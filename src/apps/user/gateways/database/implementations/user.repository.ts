import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { IUserRepository } from '../Iuser.repository';
import { MONGO_DB_HOUSI_CHALLENGE } from '../../../../../infra/persistence/mongo-db/assets/constants/constants';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name, MONGO_DB_HOUSI_CHALLENGE)
    private repository: Model<UserSchema>,
  ) {}

  async saveOne(payload: Partial<UserSchema>): Promise<UserSchema> {
    const result = await this.repository.create(payload);

    return result;
  }

  async findOneByUsername(username: string): Promise<UserSchema> {
    const result = await this.repository.findOne({ username });

    return result;
  }
}
