import { Test, TestingModule } from '@nestjs/testing';

import { ImagesService } from '../images/images.service';
import { imagesServiceMock } from '../images/__mocks__/images.service.mock';
import { ConfigService } from '../common/config/config.service';
import { configServiceMock } from '../common/config/__mocks__/config.service.mock';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mapUserToResponse } from './helpers';
import {
  usersServiceMock,
  users as usersMock,
  getUser,
} from './__mocks__/users.service.mock';

const userNo1 = getUser(1);
const userNo2 = getUser(2);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ImagesService, useValue: imagesServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    imagesService = module.get<ImagesService>(ImagesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      // when
      const events = await controller.findAll();

      // then
      expect(events).toEqual(usersMock.map(mapUserToResponse));
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserName()', () => {
    it('should return user name for given userId', async () => {
      // given
      const userId = userNo2.id;

      // when
      const user = await controller.findUserName(userId);

      // then
      expect(user).toEqual({
        firstName: userNo2.firstName,
        lastName: userNo2.lastName,
      });
      expect(service.findUserName).toHaveBeenCalledTimes(1);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-user';

      // when, then
      expect(async () => await controller.findUserName(userId)).not.toThrow();
      expect(service.findUserName).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should return updated user', async () => {
      // given
      const user = {
        ...userNo1,
        firstName: 'Updated First Name',
      };
      const userId = user.id;

      // when
      const updatedUser = await controller.update(userId, user, null);

      // then
      expect(updatedUser).toEqual(user);
    });

    it('should updated user image', async () => {
      // given
      const userId = userNo1.id;
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
      await controller.update(userId, userNo1, mockFile);

      // then
      expect(imagesService.remove).toBeCalledWith({ userId });
      expect(imagesService.create).toBeCalledWith(mockFile, { userId });
    });
  });

  describe('updatePassword()', () => {
    it('should return updated user', async () => {
      // given
      const userId = userNo1.id;
      const newPassword = {
        password: 'some-password',
        confirmPassword: 'some-password',
      };

      // when
      await controller.updatePassword(userId, newPassword);

      // then
      expect(service.updatePassword).toHaveBeenCalledWith(
        { userId },
        newPassword,
      );
    });
  });

  describe('delete()', () => {
    it('should remove user and their image', async () => {
      // given
      const userId = 'user-2';

      // when
      await controller.remove({}, userId);

      // then
      expect(imagesService.remove).toHaveBeenCalledWith({ userId });
      expect(service.remove).toHaveBeenCalledWith({ userId });
    });

    it('should remove refresh token from header', async () => {
      // given
      const userId = 'user-2';
      const req = { user: { userId, ['refresh_token']: 'jwt_refreshToken' } };

      // when
      await controller.remove(req, userId);

      // then
      expect(req.user.refresh_token).toBeUndefined();
    });
  });
});
