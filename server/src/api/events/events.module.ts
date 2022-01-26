import { Module } from '@nestjs/common';

import { ImagesService } from '../images/images.service';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, ImagesService],
})
export class EventsModule {}
