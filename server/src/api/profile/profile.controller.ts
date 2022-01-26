import { Controller, Get, Request } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  find(@Request() req) {
    const email = req?.user?.email;

    return this.userService.findOne(email);
  }
}
