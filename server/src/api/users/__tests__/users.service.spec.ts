import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../common/prisma/prisma.service';
import { prismaServiceMock } from '../../common/prisma/__mocks__/prisma.service.mock';
import { Role } from '../../common/types';
import { UsersService } from '../users.service';
import { mapUserToResponse } from '../helpers';
import {
  getUser,
  users as usersMock,
  mockFindUnique,
  mockFindMany,
  mockCreate,
  mockUpdate,
} from '../__mocks__/users.service.mock';

const userNo1 = getUser(1);
const userNo2 = getUser(2);
const userNo3 = getUser(3);

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();

    prisma.user.findMany = jest.fn().mockImplementation(mockFindMany);
    prisma.user.findUnique = jest.fn().mockImplementation(mockFindUnique);
    prisma.user.create = jest.fn().mockImplementation(mockCreate);
    prisma.user.update = jest.fn().mockImplementation(mockUpdate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      // when
      const users = await service.findAll();

      // then
      expect(users).toEqual(usersMock.map(mapUserToResponse));
    });
  });

  describe('findOne()', () => {
    it('should return user matching by email', async () => {
      // when
      const user = await service.findOne({ email: userNo2.email });

      // then
      expect(user).toEqual({
        ...userNo2,
        password: 'encrypted',
      });
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const email = 'not-existing-user@events.com';

      // when, then
      expect(async () => await service.findOne({ email })).not.toThrow();
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneWithPassword()', () => {
    it('should return user matching by email with password', async () => {
      // when
      const user = await service.findOneWithPassword({ email: userNo1.email });

      // then
      expect(user).toEqual(userNo1);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const email = 'not-existing-user@events.com';

      // when, then
      expect(
        async () => await service.findOneWithPassword({ email }),
      ).not.toThrow();
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserName()', () => {
    it('should return user name by given userId', async () => {
      // when
      const user = await service.findUserName({ userId: userNo3.id });

      // then
      expect(user).toEqual(userNo3);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-user';

      // when, then
      expect(async () => await service.findUserName({ userId })).not.toThrow();
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it('should return new user', async () => {
      // given
      const newUser = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@events.com',
        password: 'somePassword',
      };

      // when
      const createdEvent = await service.create(newUser);

      // then
      expect(createdEvent).toEqual({
        ...newUser,
        id: 'new-user-id',
      });
    });
  });

  describe('update()', () => {
    it('should return updated user', async () => {
      // given
      const user = {
        ...userNo1,
        firstName: 'Updated title',
        role: Role.ADMIN,
      };

      // when
      const updatedUser = await service.update({ userId: user.id }, user);

      // then
      expect(updatedUser).toEqual(user);
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-user';

      // when, then
      expect(
        async () => await service.update({ userId }, userNo1),
      ).not.toThrow();
    });

    it('should throw when fails validation', async () => {
      // given
      const user = {
        ...userNo1,
        firstName: 'a',
      };

      // when, then
      expect(
        async () => await service.update({ userId: user.id }, user),
      ).rejects.toThrow();
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
      const updatedUser = await service.updatePassword({ userId }, newPassword);

      // then
      expect(updatedUser).toEqual({
        ...userNo1,
        password: newPassword.password,
      });
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-user';
      const newPassword = {
        password: 'some-password',
        confirmPassword: 'some-password',
      };

      // when, then
      expect(
        async () => await service.updatePassword({ userId }, newPassword),
      ).not.toThrow();
    });

    it('should throw when fails validation', async () => {
      // given
      const userId = userNo1.id;
      const newPassword = {
        password: 'some-password',
        confirmPassword: 'not-matching-password',
      };

      // when, then
      expect(
        async () => await service.updatePassword({ userId }, newPassword),
      ).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('should delete user', async () => {
      // given
      const userId = userNo1.id;

      // when
      await service.remove({ userId });

      // then
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should not throw when there is no matching entry', async () => {
      // given
      const userId = 'not-existing-event';

      // when, then
      expect(async () => await service.remove({ userId })).not.toThrow();
    });
  });
});
