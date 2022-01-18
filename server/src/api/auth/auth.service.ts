import type { Asserts } from 'yup';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { validate, userSchemas } from '@common-packages/validators';
import { Prisma } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';
import { comparePassword } from '../common/passwordHashing';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword(email);

    if (!user) {
      throw new BadRequestException('Provided account does not exists');
    }

    const isPasswordMatching = await comparePassword(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid password or email');
    }

    delete user.password;
    return user;
  }

  async getUserRole(email: string): Promise<string | undefined> {
    const user = await this.usersService.findOne(email);

    return user?.role;
  }

  async login() {
    return { message: 'Successfully logged in' };
  }

  async register(newUser: Prisma.UserCreateInput) {
    await validate<Asserts<typeof userSchemas.registerUserSchema>>(
      userSchemas.registerUserSchema,
      newUser,
    );

    return this.prismaService.user.create({
      data: {
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  }
}
