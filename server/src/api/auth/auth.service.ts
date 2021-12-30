import type { Asserts } from 'yup';
import { Injectable } from '@nestjs/common';
import {
  validate,
  userSchemas,
  RegisterUserDto,
} from '@common-packages/validators';

import { PrismaService } from '../prisma/prisma.service';
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

  async register(registerUserDto: RegisterUserDto) {
    await validate<Asserts<typeof userSchemas.registerUserSchema>>(
      userSchemas.registerUserSchema,
      registerUserDto,
    );

    delete registerUserDto.confirmPassword;

    const createdUser = await this.prismaService.user.create({
      data: registerUserDto,
    });

    return {
      message: `You'll be able to register soon`,
    };
  }
}
