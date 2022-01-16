import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { Prisma } from '@common-packages/data-access-layer';

import { Public } from '../common/decorators/public.decorator';

import { EventsService } from './events.service';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  findMany(@Query('userId') userId: string, @Query('status') status: string) {
    const filters = {
      ...(userId ? { userId } : {}),
      ...(status ? { status: status.toUpperCase() } : {}),
    };

    return this.eventsService.findMany(filters);
  }

  @Post()
  create(@Body() event: Prisma.EventCreateInput) {
    return this.eventsService.create(event);
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

  @Patch(':eventId/status')
  updateStatus(
    @Param('eventId') eventId: string,
    @Body() event: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.updateStatus(eventId, event);
  }

  @Delete(':eventId')
  delete(@Param('eventId') eventId: string) {
    return this.eventsService.delete(eventId);
  }
}
