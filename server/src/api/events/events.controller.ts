import { Controller, Get } from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';

import { EventsService } from './events.service';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}
