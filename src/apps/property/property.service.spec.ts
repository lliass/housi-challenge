import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PropertyRepository } from './gateways/database/implementations/property.repository';
import { MockPropertyRepository } from './gateways/database/__mocks__/mock-property.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        { provide: PropertyRepository, useClass: MockPropertyRepository },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find blocked Dates', async () => {
    const blockedDatesFound = await service.getBusyDates(
      { id: '56b3aa2578dc1a90d3de53ee' },
      { start: '2024-01-05', end: '2024-01-10' },
    );

    expect(blockedDatesFound.length).toBeGreaterThan(0);
  });

  it('should not find blocked dates, because the id does not exist', async () => {
    await expect(
      service.getBusyDates(
        { id: '56b3aa2578dc1a90d3de53tt' },
        { start: '2024-01-05', end: '2024-01-10' },
      ),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should not find blocked dates, because the the dates are illogical', async () => {
    await expect(
      service.getBusyDates(
        { id: '56b3aa2578dc1a90d3de53ee' },
        { start: '2024-02-05', end: '2024-01-10' },
      ),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should not find blocked dates, because the the range dates does not exist', async () => {
    await expect(
      service.getBusyDates(
        { id: '56b3aa2578dc1a90d3de53ee' },
        { start: '2024-10-05', end: '2024-12-10' },
      ),
    ).rejects.toThrowError(NotFoundException);
  });
});
