import { Module } from '@nestjs/common';

import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule, CommonModule],
  controllers: [ApiController],
})
export class ApiModule {}
