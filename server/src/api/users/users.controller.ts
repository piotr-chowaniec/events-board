import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@common-packages/data-access-layer';

import { ConfigService, ConfigKeys } from '../common/config/config.service';
import { Public } from '../common/decorators/public.decorator';
import { multerOptions } from '../common/multer/multerOptions.config';
import { ImagesService } from '../images/images.service';

import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async findMany(@Query('skip') skip: string, @Query('take') take: string) {
    const count = await this.usersService.count();
    const users = await this.usersService.findMany(+skip, +take);

    return {
      count,
      users,
    };
  }

  @Public()
  @Get(':userId/name')
  findUserName(@Param('userId') userId: string) {
    return this.usersService.findUserName({ userId });
  }

  @Patch(':userId')
  @UseGuards(UsersGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('userId') userId: string,
    @Body()
    user: {
      firstName: string;
      lastName: string;
      email: string;
      role?: Role;
    },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      await this.imagesService.remove({ userId });
      await this.imagesService.create(file, { userId });
    }
    return this.usersService.update({ userId }, user);
  }

  @Patch(':userId/password')
  @UseGuards(UsersGuard)
  updatePassword(
    @Param('userId') userId: string,
    @Body() newPassword: { password: string; confirmPassword: string },
  ) {
    this.usersService.updatePassword({ userId }, newPassword);
  }

  @Delete(':userId')
  @UseGuards(UsersGuard)
  async remove(@Request() req, @Param('userId') userId: string) {
    const currentUser = req.user;
    const refreshTokenKey = this.configService.get(
      ConfigKeys.REFRESH_TOKEN_KEY,
    );

    await this.imagesService.remove({ userId });
    await this.usersService.remove({ userId });

    if (currentUser?.userId === userId) {
      delete req.user[refreshTokenKey];
    }
  }
}
