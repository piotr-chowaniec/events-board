import { Injectable } from '@nestjs/common';
import { User } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';

import { mapUserToResponse } from './helpers';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(mapUserToResponse);
  }

  async findOne(email): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return mapUserToResponse(user);
  }
}
