import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../../users/users.service';
import {
  usersServiceMock,
  getUser,
} from '../../users/__mocks__/users.service.mock';
import { ProfileController } from '../profile.controller';

const userNo1 = getUser(1);

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find()', () => {
    it('should return all users', async () => {
      // given
      const req = { user: { email: userNo1.email } };

      // when
      const user = await controller.find(req);

      // then
      expect(user).toEqual(userNo1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
