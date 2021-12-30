import { Injectable } from '@nestjs/common';
import { User } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(email): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
