import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../common/prisma/prisma.service';
import { prismaServiceMock } from '../common/prisma/__mocks__/prisma.service.mock';

import { EventsService } from './events.service';
import {
  getEvent,
  mockFindUnique,
  mockFindMany,
  mockCreate,
  mockUpdate,
} from './__mocks__/events.service.mock';

const eventNo1 = getEvent(1, 1);
const eventNo2 = getEvent(2, 1);
const eventNo6 = getEvent(6, 1);
eventNo6.status = 'DRAFT';

describe('EventsService', () => {
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

  describe('findMany()', () => {
    it('should return all matching entries for given userId', async () => {
      // given
      const userId = eventNo1.userId;

      // when
      const events = await service.findMany({ userId });

      // then
      expect(events).toEqual([eventNo1, eventNo2, eventNo6]);
    });

    it('should return all matching entries for given status', async () => {
      // given
      const status = eventNo6.status;

      // when
      const events = await service.findMany({ status });

      // then
      expect(events).toEqual([eventNo6]);
    });

    it('should return all matching entries for given userId and status', async () => {
      // given
      const { userId, status } = eventNo1;

      // when
      const events = await service.findMany({ userId, status });

      // then
      expect(events).toEqual([eventNo1, eventNo2]);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.findMany({ eventId })).not.toThrow();
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
