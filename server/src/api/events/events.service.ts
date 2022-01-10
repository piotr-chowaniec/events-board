import { Injectable } from '@nestjs/common';
import { Event } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<Event[]> {
    return this.prismaService.event.findMany();
  }
}
