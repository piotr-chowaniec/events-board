import { Test, TestingModule } from '@nestjs/testing';

import { ImagesService } from '../../images/images.service';
import { imagesServiceMock } from '../../images/__mocks__/images.service.mock';
import { EventsController } from '../events.controller';
import { EventsService } from '../events.service';
import {
  eventsServiceMock,
  events as eventsMock,
} from '../__mocks__/events.service.mock';

const eventNo1 = eventsMock[0];
const eventNo2 = eventsMock[1];
const eventNo6 = {
  ...eventsMock[5],
  status: 'DRAFT',
};

describe('EventsController', () => {
  const skip = '0';
  const take = '100';

  let controller: EventsController;
  let service: EventsService;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: eventsServiceMock },
        { provide: ImagesService, useValue: imagesServiceMock },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
    imagesService = module.get<ImagesService>(ImagesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMany()', () => {
    it('should return all events', async () => {
      // when
      const events = await controller.findMany(skip, take, null, null, null);

      // then
      expect(events).toEqual({
        count: eventsMock.length,
        events: eventsMock,
      });
      expect(service.count).toHaveBeenCalledTimes(1);
      expect(service.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return events for given userId', async () => {
      // given
      const userId = eventNo1.userId;

      // when
      const events = await controller.findMany(skip, take, userId, null, null);

      // then
      expect(events).toEqual({
        count: 3,
        events: [eventNo1, eventNo2, eventNo6],
      });
      expect(service.count).toHaveBeenCalledTimes(1);
      expect(service.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return events for given status', async () => {
      // given
      const status = 'DRAFT';

      // when
      const events = await controller.findMany(skip, take, null, status, null);

      // then
      expect(events).toEqual({
        count: 1,
        events: [eventNo6],
      });
      expect(service.count).toHaveBeenCalledTimes(1);
      expect(service.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return events for given userId and status', async () => {
      // given
      const userId = eventNo1.userId;
      const status = eventNo1.status;

      // when
      const events = await controller.findMany(
        skip,
        take,
        userId,
        status,
        null,
      );

      // then
      expect(events).toEqual({
        count: 2,
        events: [eventNo1, eventNo2],
      });
      expect(service.count).toHaveBeenCalledTimes(1);
      expect(service.findMany).toHaveBeenCalledTimes(1);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-user';

      // when, then
      expect(
        async () => await controller.findMany(skip, take, userId, null, null),
      ).not.toThrow();
    });
  });

  describe('find()', () => {
    it('should return event for given eventId', async () => {
      // given
      const eventId = eventNo2.id;

      // when
      const event = await controller.find(eventId);

      // then
      expect(event).toEqual(eventNo2);
      expect(service.find).toHaveBeenCalledTimes(1);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const eventId = 'not-existing-event';

      // when, then
      expect(async () => await controller.find(eventId)).not.toThrow();
      expect(service.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it('should return created event', async () => {
      // given
      const newEvent = {
        userId: 'user-99',
      };

      // when
      const event = await controller.create(newEvent);

      // then
      expect(event).toEqual({
        id: 'new-event-id',
        ...newEvent,
      });
      expect(service.create).toHaveBeenCalledWith(newEvent);
    });
  });

  describe('update()', () => {
    it('should return updated event', async () => {
      // given
      const event = {
        ...eventNo1,
        description: 'Updated Description',
      };
      const eventId = event.id;

      // when
      const updatedEvent = await controller.update(eventId, event, null);

      // then
      expect(updatedEvent).toEqual(event);
    });

    it('should updated event image', async () => {
      // given
      const eventId = eventNo1.id;
      const mockFile = {
        filename: 'fileName',
        fieldname: 'fieldName',
        originalname: 'originalFileName',
        encoding: 'encoding',
        mimetype: 'mimetype',
        size: 123123,
        stream: null,
        destination: 'destination',
        path: 'path',
        buffer: null,
      };

      // when
      await controller.update(eventId, eventNo1, mockFile);

      // then
      expect(imagesService.remove).toBeCalledWith({ eventId });
      expect(imagesService.create).toBeCalledWith(mockFile, { eventId });
    });
  });

  describe('updateStatus()', () => {
    it('should return updated event', async () => {
      // given
      const event = {
        ...eventNo1,
        status: 'DRAFT',
      };
      const eventId = event.id;

      // when
      const updatedEvent = await controller.updateStatus(eventId, event);

      // then
      expect(updatedEvent).toEqual(event);
    });
  });

  describe('delete()', () => {
    it('should delete event', async () => {
      // given
      const eventId = 'event-2';

      // when
      await controller.delete(eventId);

      // then
      expect(service.delete).toHaveBeenCalledWith(eventId);
    });
  });
});
