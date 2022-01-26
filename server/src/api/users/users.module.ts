import { Module } from '@nestjs/common';

import { ImagesService } from '../images/images.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ImagesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
