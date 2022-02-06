import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '../../common/config/config.service';
import { configServiceMock } from '../../common/config/__mocks__/config.service.mock';
import { PrismaService } from '../../common/prisma/prisma.service';
import { prismaServiceMock } from '../../common/prisma/__mocks__/prisma.service.mock';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { cloudinaryServiceMock } from '../../common/cloudinary/__mocks__/cloudinary.service.mock';
import { ImagesService } from '../images.service';
import {
  userImage,
  eventImage,
  mockFindUnique,
  mockCreate,
} from '../__mocks__/images.service.mock';

describe('ImageService', () => {
  let service: ImagesService;
  let prisma: PrismaService;
  let cloudinary: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        { provide: ConfigService, useValue: configServiceMock },
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: CloudinaryService, useValue: cloudinaryServiceMock },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    prisma = module.get<PrismaService>(PrismaService);
    cloudinary = module.get<CloudinaryService>(CloudinaryService);

    jest.clearAllMocks();

    prisma.image.findUnique = jest.fn().mockImplementation(mockFindUnique);
    prisma.image.create = jest.fn().mockImplementation(mockCreate);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('should return unique user image', async () => {
      // when
      const image = await service.findOne({ userId: userImage.userId });

      // then
      expect(image).toEqual(userImage);
    });

    it('should return unique event image', async () => {
      // when
      const image = await service.findOne({ eventId: eventImage.eventId });

      // then
      expect(image).toEqual(eventImage);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'user-with-non-existing-image';

      // when, then
      expect(async () => await service.findOne({ userId })).not.toThrow();
      expect(prisma.image.findUnique).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });

  describe('create()', () => {
    it('should return new user image', async () => {
      // given
      const params = {
        userId: 'user-2',
        eventId: null,
      };

      // when
      const createdImage = await service.create(null, params);

      // then
      expect(cloudinary.upload).toHaveBeenCalledTimes(1);
      expect(createdImage).toEqual({ id: 'new-image-id', userId: 'user-2' });
    });

    it('should return new event image', async () => {
      // given
      const params = {
        userId: null,
        eventId: 'event-2',
      };

      // when
      const createdImage = await service.create(null, params);

      // then
      expect(cloudinary.upload).toHaveBeenCalledTimes(1);
      expect(createdImage).toEqual({ id: 'new-image-id', eventId: 'event-2' });
    });
  });

  describe('remove()', () => {
    it('should remove image and destroy cloudinary file', async () => {
      // when
      await service.remove({ userId: userImage.userId });

      // then
      expect(prisma.image.findUnique).toHaveBeenCalledWith({
        where: { userId: userImage.userId },
      });
      expect(prisma.image.delete).toHaveBeenCalledWith({
        where: { publicId: userImage.publicId },
      });
      expect(cloudinary.destroy).toHaveBeenCalledTimes(1);
    });

    it('should not remove image if there is no matching entry', async () => {
      // given
      const userId = 'user-with-non-existing-image';

      // when
      await service.remove({ userId });

      // then
      expect(prisma.image.findUnique).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(prisma.image.delete).toHaveBeenCalledTimes(0);
      expect(cloudinary.destroy).toHaveBeenCalledTimes(0);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'user-with-non-existing-image';

      // when, then
      expect(async () => await service.remove({ userId })).not.toThrow();
    });
  });
});
