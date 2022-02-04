import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import { validate, userSchemas } from '@common-packages/validators';
import { Role, User } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';

import { mapUserToResponse } from './helpers';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
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
            events: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return users.map(mapUserToResponse);
  }

  async findOne({ email }: { email: string }): Promise<User | undefined> {
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

  async findOneWithPassword({
    email,
  }: {
    email: string;
  }): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserName({
    userId,
  }: {
    userId: string;
  }): Promise<{ firstName: string; lastName: string } | undefined> {
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

  async create(newUser: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  }

  async update(
    { userId }: { userId: string },
    user: {
      firstName: string;
      lastName: string;
      email: string;
      role?: Role;
    },
  ) {
    if (user?.role) {
      await validate<Asserts<typeof userSchemas.updateProfileSchema>>(
        userSchemas.updateUserSchema,
        user,
      );
    } else {
      await validate<Asserts<typeof userSchemas.updateProfileSchema>>(
        userSchemas.updateProfileSchema,
        user,
      );
    }

    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        ...(user.role ? { role: user.role } : {}),
      },
    });
  }

  async updatePassword(
    { userId }: { userId: string },
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

  async remove({ userId }: { userId: string }) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
