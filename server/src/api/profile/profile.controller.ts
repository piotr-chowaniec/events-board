import { Controller, Get, Request } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  find(@Request() req) {
    const email = req?.user?.email;

    return this.usersService.findOne({ email });
  }
}
