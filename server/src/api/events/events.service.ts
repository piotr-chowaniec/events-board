import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import { Event, User } from '@common-packages/data-access-layer';
import { validate, eventSchemas } from '@common-packages/validators';

import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  findMany(filters): Promise<Event[]> {
    return this.prismaService.event.findMany({
      ...(filters ? { where: filters } : {}),
      include: {
        image: {
          select: {
            cloudName: true,
            publicId: true,
            version: true,
            format: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
        participants: {
          select: {
            userId: true,
          },
        },
        image: {
          select: {
            cloudName: true,
            publicId: true,
            version: true,
            format: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });
  }

  create(event): Promise<Event> {
    return this.prismaService.event.create({
      data: event,
    });
  }

  async update(eventId: string, event) {
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

  async updateStatus(eventId: string, event) {
    await validate<Asserts<typeof eventSchemas.eventStatus>>(
      eventSchemas.eventStatus,
      event,
    );

    return this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        status: event.status,
      },
    });
  }

  async delete(eventId: string) {
    return this.prismaService.event.delete({
      where: {
        id: eventId,
      },
    });
  }
}
