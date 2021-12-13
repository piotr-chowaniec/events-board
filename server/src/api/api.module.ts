import { Module } from '@nestjs/common';

import { EventsModule } from './events/events.module';
import { ApiController } from './api.controller';

@Module({
  imports: [EventsModule],
  controllers: [ApiController],
})
export class ApiModule {}
