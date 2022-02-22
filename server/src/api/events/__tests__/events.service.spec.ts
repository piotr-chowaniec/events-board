import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../common/prisma/prisma.service';
import { prismaServiceMock } from '../../common/prisma/__mocks__/prisma.service.mock';
import { EventsService } from '../events.service';
import {
  getEvent,
  mockFindUnique,
  mockFindMany,
  mockCount,
  mockCreate,
  mockUpdate,
  events as eventsMock,
} from '../__mocks__/events.service.mock';

const eventNo1 = eventsMock[0];
const eventNo2 = eventsMock[1];
const eventNo6 = {
  ...eventsMock[5],
  status: 'DRAFT',
};

describe('EventsService', () => {
  const skip = 0;
  const take = 100;

  let service: EventsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();

    prisma.event.findUnique = jest.fn().mockImplementation(mockFindUnique);
    prisma.event.findMany = jest.fn().mockImplementation(mockFindMany);
    prisma.event.create = jest.fn().mockImplementation(mockCreate);
    prisma.event.update = jest.fn().mockImplementation(mockUpdate);
    prisma.event.count = jest.fn().mockImplementation(mockCount);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find()', () => {
    it('should return unique event', async () => {
      // when
      const event = await service.find(eventNo2.id);

      // then
      expect(event).toEqual(eventNo2);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.find(eventId)).not.toThrow();
      expect(prisma.event.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('count()', () => {
    it('should return number of entries', async () => {
      // given
      const userId = eventNo1.userId;

      // when
      const count = await service.count({ userId });

      // then
      expect(count).toEqual(3);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.count({ eventId })).not.toThrow();
      expect(prisma.event.count).toHaveBeenCalledTimes(1);
    });
  });

  describe('findMany()', () => {
    it('should return all matching entries for given userId', async () => {
      // given
      const userId = eventNo1.userId;

      // when
      const events = await service.findMany(skip, take, { userId });

      // then
      expect(events).toEqual([eventNo1, eventNo2, eventNo6]);
    });

    it('should return all matching entries for given status', async () => {
      // given
      const status = eventNo6.status;

      // when
      const events = await service.findMany(skip, take, { status });

      // then
      expect(events).toEqual([eventNo6]);
    });

    it('should return all matching entries for given userId and status', async () => {
      // given
      const { userId, status } = eventNo1;

      // when
      const events = await service.findMany(skip, take, { userId, status });

      // then
      expect(events).toEqual([eventNo1, eventNo2]);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(
        async () => await service.findMany(skip, take, { eventId }),
      ).not.toThrow();
    });
  });

  describe('create()', () => {
    it('should return new event', async () => {
      // given
      const newEvent = getEvent(99, 20);

      // when
      const createdEvent = await service.create(newEvent);

      // then
      expect(createdEvent).toEqual({
        ...newEvent,
        id: 'new-event-id',
      });
    });
  });

  describe('update()', () => {
    it('should return updated event', async () => {
      // given
      const event = {
        ...eventNo1,
        title: 'Updated title',
      };

      // when
      const updatedEvent = await service.update(event.id, event);

      // then
      expect(updatedEvent).toEqual(event);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.update(eventId, eventNo1)).not.toThrow();
    });

    it('should throw when fails validation', async () => {
      // given
      const event = {
        ...eventNo1,
        eventDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // now - 1 day
      };

      // when, then
      expect(
        async () => await service.update(event.id, event),
      ).rejects.toThrow();
    });
  });

  describe('updateStatus()', () => {
    it('should return updated event', async () => {
      // given
      const event = {
        ...eventNo1,
        status: 'DRAFT',
      };

      // when
      const updatedEvent = await service.updateStatus(event.id, event);

      // then
      expect(updatedEvent).toEqual(event);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(
        async () => await service.updateStatus(eventId, eventNo1),
      ).not.toThrow();
    });

    it('should throw when fails validation', async () => {
      // given
      const event = {
        ...eventNo1,
        status: 'WRONG-STATUS',
      };

      // when, then
      expect(
        async () => await service.updateStatus(event.id, event),
      ).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('should delete event', async () => {
      // given
      const eventId = eventNo1.id;

      // when
      await service.delete(eventId);

      // then
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: eventId },
      });
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.delete(eventId)).not.toThrow();
    });
  });
});
