import { Module } from '@nestjs/common';

import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, ProfileModule, UsersModule, EventsModule, CommonModule],
  controllers: [ApiController],
})
export class ApiModule {}
