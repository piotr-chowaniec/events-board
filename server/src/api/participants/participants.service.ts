import { Participant } from '@common-packages/data-access-layer';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prismaService: PrismaService) {}

  find(userId: string, eventId: string): Promise<Participant | undefined> {
    return this.prismaService.participant.findUnique({
      where: {
        ['userId_eventId']: {
          userId,
          eventId,
        },
      },
    });
  }

  findMany(filters?): Promise<Participant[] | undefined> {
    return this.prismaService.participant.findMany({
      ...(filters ? { where: filters } : {}),
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  create(participant): Promise<Participant> {
    return this.prismaService.participant.create({
      data: participant,
    });
  }

  delete(userId: string, eventId: string): Promise<Participant | undefined> {
    return this.prismaService.participant.delete({
      where: {
        ['userId_eventId']: {
          userId,
          eventId,
        },
      },
    });
  }
}
