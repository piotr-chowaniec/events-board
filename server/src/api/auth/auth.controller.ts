import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Public()
  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }
}
