import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import { Prisma, Event, User } from '@common-packages/data-access-layer';
import { validate, eventSchemas } from '@common-packages/validators';

import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<Event[]> {
    return this.prismaService.event.findMany();
  }

  find(eventId: string): Promise<
    Event & {
      user: { firstName: User['firstName']; lastName: User['lastName'] };
    }
  > {
    return this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(eventId: string, event: Prisma.EventUpdateInput) {
    await validate<Asserts<typeof eventSchemas.event>>(
      eventSchemas.event,
      event,
    );

    return this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        title: event.title,
        description: event.description,
        shortDescription: event.shortDescription,
        eventDate: event.eventDate,
      },
    });
  }
}
