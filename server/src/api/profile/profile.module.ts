import { Module } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { ProfileController } from './profile.controller';

@Module({
  providers: [UsersService],
  controllers: [ProfileController],
})
export class ProfileModule {}
