import {
  Controller,
  UseGuards,
  Post,
  Delete,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { Prisma } from '@common-packages/data-access-layer';

import { ParticipantsService } from './participants.service';
import { ParticipantsGuard } from './participants.guard';

@Controller('api/participants')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantsService) {}

  @Get()
  findMany() {
    return this.participantService.findMany();
  }

  @Post()
  create(@Body() participant: Prisma.ParticipantCreateInput) {
    return this.participantService.create(participant);
  }

  @Delete(':userId/:eventId')
  @UseGuards(ParticipantsGuard)
  delete(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.participantService.delete(userId, eventId);
  }
}
