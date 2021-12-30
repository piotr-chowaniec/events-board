import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import { validate, userSchemas } from '@common-packages/validators';
import { Prisma } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === pass) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login() {
    return { message: 'Successfully logged in' };
  }

  async register(newUser: Prisma.UserCreateInput) {
    await validate<Asserts<typeof userSchemas.registerUserSchema>>(
      userSchemas.registerUserSchema,
      newUser,
    );

    const createdUser = await this.prismaService.user.create({
      data: {
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });

    return {
      message: `${createdUser.firstName} ${createdUser.lastName} successfully registered`,
    };
  }
}
