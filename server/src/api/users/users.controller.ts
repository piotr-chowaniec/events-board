import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { Prisma } from '@common-packages/data-access-layer';

import { ConfigService, ConfigKeys } from '../common/config/config.service';
import { Public } from '../common/decorators/public.decorator';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':userId/name')
  findUserName(@Param('userId') userId: string) {
    return this.usersService.findUserName(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() user: Prisma.UserUpdateInput,
  ) {
    this.usersService.update(userId, user);
  }

  @Patch(':userId/password')
  updatePassword(
    @Param('userId') userId: string,
    @Body() newPassword: { password: string; confirmPassword: string },
  ) {
    this.usersService.updatePassword(userId, newPassword);
  }

  @Delete(':userId')
  async remove(@Request() req, @Param('userId') userId: string) {
    const currentUser = req.user;
    const refreshTokenKey = this.configService.get(
      ConfigKeys.REFRESH_TOKEN_KEY,
    );
    await this.usersService.remove(userId);

    if (currentUser.userId === userId) {
      delete req.user[refreshTokenKey];
    }
  }
}
