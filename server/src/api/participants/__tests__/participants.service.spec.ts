import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../common/prisma/prisma.service';
import { prismaServiceMock } from '../../common/prisma/__mocks__/prisma.service.mock';
import { ParticipantsService } from '../participants.service';
import {
  getParticipant,
  mockFindUnique,
  mockFindMany,
  mockCreate,
  mockCount,
} from '../__mocks__/participants.service.mock';

const participantNo1 = getParticipant(1, 1, 1);
const participantNo2 = getParticipant(2, 1, 2);
const participantNo4 = getParticipant(3, 2, 2);

describe('ParticipantsService', () => {
  const skip = 0;
  const take = 100;

  let service: ParticipantsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantsService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();

    prisma.participant.findUnique = jest
      .fn()
      .mockImplementation(mockFindUnique);
    prisma.participant.findMany = jest.fn().mockImplementation(mockFindMany);
    prisma.participant.create = jest.fn().mockImplementation(mockCreate);
    prisma.participant.count = jest.fn().mockImplementation(mockCount);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find()', () => {
    it('should return unique participant', async () => {
      // when
      const participant = await service.find('user-1', 'event-2');

      // then
      expect(participant).toEqual(participantNo2);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'user-1';
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.find(userId, eventId)).not.toThrow();
      expect(prisma.participant.findUnique).toHaveBeenCalledWith({
        where: { ['userId_eventId']: { userId, eventId } },
      });
    });
  });

  describe('count()', () => {
    it('should return number of entries', async () => {
      // given
      const userId = 'user-1';

      // when
      const count = await service.count({ userId });

      // then
      expect(count).toEqual(2);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.count({ eventId })).not.toThrow();
      expect(prisma.participant.count).toHaveBeenCalledTimes(1);
    });
  });

  describe('findMany()', () => {
    it('should return all matching entries for given userId', async () => {
      // given
      const userId = 'user-1';

      // when
      const participants = await service.findMany(skip, take, { userId });

      // then
      expect(participants).toEqual([participantNo1, participantNo2]);
    });

    it('should return all matching entries for given eventId', async () => {
      // given
      const eventId = 'event-2';

      // when
      const participants = await service.findMany(skip, take, { eventId });

      // then
      expect(participants).toEqual([participantNo2, participantNo4]);
    });

    it('should return all matching entries for given userId and eventId', async () => {
      // given
      const userId = 'user-1';
      const eventId = 'event-2';

      // when
      const participants = await service.findMany(skip, take, {
        userId,
        eventId,
      });

      // then
      expect(participants).toEqual([participantNo2]);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'non-existing-user';

      // when, then
      expect(
        async () => await service.findMany(skip, take, { userId }),
      ).not.toThrow();
    });
  });

  describe('create()', () => {
    it('should return new participant', async () => {
      // given
      const newParticipant = {
        userId: 'user-99',
        eventId: 'event-66',
      };

      // when
      const createdParticipant = await service.create(newParticipant);

      // then
      expect(createdParticipant).toEqual({
        id: 'new-participant-id',
        ...newParticipant,
      });
    });
  });

  describe('delete()', () => {
    it('should delete participant', async () => {
      // given
      const userId = 'user-1';
      const eventId = 'event-1';

      // when
      await service.delete(userId, eventId);

      // then
      expect(prisma.participant.delete).toHaveBeenCalledWith({
        where: { ['userId_eventId']: { userId, eventId } },
      });
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'user-1';
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await service.delete(userId, eventId)).not.toThrow();
    });
  });
});
