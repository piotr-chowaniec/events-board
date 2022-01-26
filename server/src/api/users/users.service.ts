import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import { validate, userSchemas } from '@common-packages/validators';
import { Prisma, User } from '@common-packages/data-access-layer';

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
      include: {
        image: {
          select: {
            cloudName: true,
            publicId: true,
            version: true,
            format: true,
          },
        },
      },
    });

    return mapUserToResponse(user);
  }

  async findOneWithPassword(email): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserName(
    userId,
  ): Promise<{ firstName: string; lastName: string } | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
      },
    });
  }

  async update(userId: string, user: Prisma.UserUpdateInput) {
    await validate<Asserts<typeof userSchemas.updateProfileSchema>>(
      userSchemas.updateProfileSchema,
      user,
    );

    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  async updatePassword(
    userId: string,
    newPassword: { password: string; confirmPassword: string },
  ) {
    await validate<Asserts<typeof userSchemas.updatePasswordSchema>>(
      userSchemas.updatePasswordSchema,
      newPassword,
    );

    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword.password,
      },
    });
  }

  async remove(userId: string) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
