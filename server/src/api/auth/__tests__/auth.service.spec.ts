import { Test, TestingModule } from '@nestjs/testing';

import { Role } from '../../common/types';
import { UsersService } from '../../users/users.service';
import {
  usersServiceMock,
  getUser,
} from '../../users/__mocks__/users.service.mock';
import { AuthService } from '../auth.service';

const userNo1 = getUser(1);

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should succeed when there is an user with given email and password matches', async () => {
      // given
      const { email } = userNo1;
      const password = 'some-password';

      // when, then
      expect(
        async () => await authService.validateUser(email, password),
      ).not.toThrow();
      expect(usersService.findOneWithPassword).toHaveBeenCalledWith({ email });
    });

    it('should throw when there is no matching user', async () => {
      // given
      const email = 'non-existing-user@events.com';
      const password = 'not-matter';

      // when, then
      expect(
        async () => await authService.validateUser(email, password),
      ).rejects.toThrow();
      expect(usersService.findOneWithPassword).toHaveBeenCalledWith({ email });
    });

    it('should throw when password does not match', async () => {
      // given
      const { email } = userNo1;
      const password = 'wrong-password';

      // when, then
      expect(
        async () => await authService.validateUser(email, password),
      ).rejects.toThrow();
      expect(usersService.findOneWithPassword).toHaveBeenCalledWith({ email });
    });
  });

  describe('getUserRole()', () => {
    it('should return user role by given email', async () => {
      // given
      const { email } = userNo1;

      // when
      const role = await authService.getUserRole(email);

      // then
      expect(role).toEqual(Role.USER);
      expect(usersService.findOne).toHaveBeenCalledWith({ email });
    });

    it('should not throw when there is no matching user', async () => {
      // given
      const email = 'non-existing-user@events.com';

      // when, then
      expect(async () => await authService.getUserRole(email)).not.toThrow();
      expect(usersService.findOne).toHaveBeenCalledWith({ email });
    });
  });

  describe('register()', () => {
    const newUser = {
      email: 'new-user@events.com',
      firstName: 'James',
      lastName: 'Smith',
      password: 'some-random-password',
    };

    it('should create new user', async () => {
      // when
      const user = await authService.register(newUser);

      // then
      expect(usersService.create).toHaveBeenCalledWith(newUser);
      expect(user).toEqual({
        ...newUser,
        id: 'new-user-id',
      });
    });

    it('should throw when fails validation', async () => {
      // given
      const invalidUser = {
        ...newUser,
        email: 'not-an-email',
      };

      // when, then
      expect(
        async () => await authService.register(invalidUser),
      ).rejects.toThrow();
    });
  });
});
