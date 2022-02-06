import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { ConfigService, ConfigKeys } from '../common/config/config.service';
import { configServiceMock } from '../common/config/__mocks__/config.service.mock';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authServiceMock } from './__mocks__/auth.service.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('jwt_token') },
        },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register and grand jwt token', async () => {
      // given
      const req = {};
      const newUser = {
        email: 'new-user@events.com',
        firstName: 'James',
        lastName: 'Smith',
        password: 'some-random-password',
      };
      const accessTokenKey = configServiceMock.get(ConfigKeys.ACCESS_TOKEN_KEY);

      // when
      await controller.register(req, newUser);

      // then
      expect(service.register).toHaveBeenCalledWith(newUser);
      expect(req).toEqual({
        user: {
          [accessTokenKey]: 'jwt_token',
        },
      });
    });
  });
});
