import {
  Controller,
  UseGuards,
  Post,
  Delete,
  Body,
  Param,
  Get,
  Query,
} from '@nestjs/common';

import { ParticipantsService } from './participants.service';
import { ParticipantsGuard } from './participants.guard';
import { getFilters } from './helpers';

@Controller('api/participants')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantsService) {}

  @Get()
  async findMany(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('eventId') eventId: string,
  ) {
    const filters = getFilters({ eventId });
    const count = await this.participantService.count(filters);

    const participants = await this.participantService.findMany(
      +skip,
      +take,
      filters,
    );

    return {
      count,
      participants,
    };
  }

  @Post()
  create(@Body() participant: { userId: string; eventId: string }) {
    return this.participantService.create(participant);
  }

  @Delete(':userId/:eventId')
  @UseGuards(ParticipantsGuard)
  delete(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.participantService.delete(userId, eventId);
  }
}
