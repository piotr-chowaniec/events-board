import { Test, TestingModule } from '@nestjs/testing';

import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import {
  participantsServiceMock,
  participants as participantsMock,
} from './__mocks__/participants.service.mock';

describe('ParticipantsController', () => {
  let controller: ParticipantsController;
  let service: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [
        { provide: ParticipantsService, useValue: participantsServiceMock },
      ],
    }).compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
    service = module.get<ParticipantsService>(ParticipantsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMany()', () => {
    it('should return all participants', async () => {
      // when
      const participants = await controller.findMany();

      // then
      expect(participants).toEqual(participantsMock);
      expect(service.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it('should return created participant', async () => {
      // given
      const newParticipant = {
        userId: 'user-99',
        eventId: 'event-66',
      };

      // when
      const participants = await controller.create(newParticipant);

      // then
      expect(participants).toEqual({
        id: 'new-participant-id',
        ...newParticipant,
      });
      expect(service.create).toHaveBeenCalledWith(newParticipant);
    });
  });

  describe('delete()', () => {
    it('should delete participant', async () => {
      // given
      const userId = 'user-1';
      const eventId = 'event-2';

      // when
      await controller.delete(userId, eventId);

      // then
      expect(service.delete).toHaveBeenCalledWith(userId, eventId);
    });
  });
});
