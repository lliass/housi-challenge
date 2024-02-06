import { IProperty } from '../Iproperty.entity';
import { IPropertyRepository, RangeDatesQuery } from '../Iproperty.repository';

const PROPERTY_MOCK: IProperty[] = [
  {
    _id: '65b432ae59bfacb3ffc4b0b5',
    property: {
      _id: '56b3aa2578dc1a90d3de53ee',
      name: 'Unidade 2',
    },
    checkIn: new Date('2024-01-05T00:00:00.000Z'),
    checkOut: new Date('2024-01-10T00:00:00.000Z'),
    residents: [
      {
        userId: '45b3aa2578dc1a90d3de53ee',
        name: 'Morador 1',
        email: 'morador1@email.com',
        phone: '(11) 99999-9999',
      },
    ],
  },
  {
    _id: '65b432ae59bfacb3ffc4b0b4',
    property: {
      _id: '55b3aa2578dc1a90d3de53ee',
      name: 'Unidade 1',
    },
    checkIn: new Date('2024-07-01T00:00:00.000Z'),
    checkOut: new Date('2024-12-10T00:00:00.000Z'),
    residents: [
      {
        userId: '45b3aa2578dc1a90d3de53ee',
        name: 'Morador 1',
        email: 'morador1@email.com',
        phone: '(11) 99999-9999',
      },
    ],
  },
  {
    _id: '65b432ae59bfacb3ffc4b0af',
    property: {
      _id: '55b3aa2578dc1a90d3de53ee',
      name: 'Unidade 1',
    },
    checkIn: new Date('2024-01-10T00:00:00.000Z'),
    checkOut: new Date('2024-02-10T00:00:00.000Z'),
    residents: [
      {
        userId: '45b3aa2578dc1a90d3de53ee',
        name: 'Morador 1',
        email: 'morador1@email.com',
        phone: '(11) 99999-9999',
      },
    ],
  },
];

export class MockPropertyRepository implements IPropertyRepository {
  async findByRangeDate(query: RangeDatesQuery): Promise<IProperty[]> {
    const { id, startDate, endDate } = query;

    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    const result = PROPERTY_MOCK.filter((propertyMock) => {
      const { checkIn, checkOut } = propertyMock;

      const idMatch = !!id ? propertyMock.property._id === id : true;
      const dataMatch =
        (checkIn >= startDateFormatted && checkIn <= endDateFormatted) ||
        (checkOut >= startDateFormatted && checkOut <= endDateFormatted);

      return idMatch && dataMatch;
    });

    return Promise.resolve(result);
  }
}
