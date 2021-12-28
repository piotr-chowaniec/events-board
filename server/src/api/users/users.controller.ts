import { Controller, Get } from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
