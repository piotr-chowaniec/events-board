import { Module } from '@nestjs/common';

import { RegisterModule } from './register/register.module';
import { EventsModule } from './events/events.module';
import { ApiController } from './api.controller';

@Module({
  imports: [RegisterModule, EventsModule],
  controllers: [ApiController],
})
export class ApiModule {}
