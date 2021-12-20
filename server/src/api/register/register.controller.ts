import { Controller, Post, Body } from '@nestjs/common';

import { RegisterService } from './register.service';

@Controller('api/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() body) {
    return this.registerService.register(body);
  }
}
