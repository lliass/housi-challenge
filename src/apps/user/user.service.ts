import { Injectable } from '@nestjs/common';
import { UserRepository } from './gateways/database/implementations/user.repository';
import { UserSchema } from './gateways/database/implementations/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOneByUsername(username: string): Promise<UserSchema | undefined> {
    const result = await this.userRepository.findOneByUsername(username);
    return result;
  }

  async saveOne(payload: Partial<UserSchema>): Promise<UserSchema> {
    const result = await this.userRepository.saveOne(payload);
    return result;
  }
}
