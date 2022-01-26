import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@common-packages/data-access-layer';

import { Public } from '../common/decorators/public.decorator';
import { multerOptions } from '../common/multer/multerOptions.config';
import { ImagesService } from '../images/images.service';

import { EventsService } from './events.service';
import { EventsGuard } from './events.guard';

@Controller('api/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly imagesService: ImagesService,
  ) {}

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
  @UseGuards(EventsGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('eventId') eventId: string,
    @Body() event: Prisma.EventUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    event.eventDate = new Date(String(event.eventDate));
    if (file) {
      await this.imagesService.remove({ eventId });
      await this.imagesService.create(file, { eventId });
    }
    return this.eventsService.update(eventId, event);
  }

  @Patch(':eventId/status')
  @UseGuards(EventsGuard)
  updateStatus(
    @Param('eventId') eventId: string,
    @Body() event: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.updateStatus(eventId, event);
  }

  @Delete(':eventId')
  @UseGuards(EventsGuard)
  async delete(@Param('eventId') eventId: string) {
    await this.imagesService.remove({ eventId });
    return this.eventsService.delete(eventId);
  }
}
