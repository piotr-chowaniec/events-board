import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { Prisma } from '@common-packages/data-access-layer';

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

  @Public()
  @Get(':eventId')
  find(@Param('eventId') eventId: string) {
    return this.eventsService.find(eventId);
  }

  @Patch(':eventId')
  update(
    @Param('eventId') eventId: string,
    @Body() event: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.update(eventId, event);
  }
}
