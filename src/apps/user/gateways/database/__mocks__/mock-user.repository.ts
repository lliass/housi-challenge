import { IUser } from '../Iuser.entity';
import { IUserRepository } from '../Iuser.repository';

const USER_MOCK: IUser[] = [
  {
    _id: 'testId1',
    username: 'usernameTest',
    password: 'passwordTest',
  },
];

export class MockUserRepository implements IUserRepository {
  async saveOne(payload: Partial<IUser>): Promise<IUser> {
    const newId = USER_MOCK.length + 1;

    USER_MOCK.push({
      _id: 'testId' + newId,
      username: payload.username,
      password: payload.password,
    });

    const userInserted = USER_MOCK[USER_MOCK.length - 1];

    return Promise.resolve(userInserted);
  }
  async findOneByUsername(username: string): Promise<IUser | null> {
    const result = USER_MOCK.find((userMock) => userMock.username === username);

    return result;
  }
}
