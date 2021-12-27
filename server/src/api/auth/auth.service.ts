import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login() {
    return { message: 'Successfully logged in' };
  }

  async register(body) {
    console.log(body);

    return {
      message: `You'll be able to register soon`,
    };
  }
}
