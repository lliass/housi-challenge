import { IUser } from './Iuser.entity';

interface IUserRepository {
  saveOne(payload: Partial<IUser>): Promise<IUser>;
  findOneByUsername(username: string): Promise<IUser | null>;
}

export { IUserRepository };
