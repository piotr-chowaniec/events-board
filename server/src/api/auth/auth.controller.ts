import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { Prisma } from '@common-packages/data-access-layer';
import { JwtService } from '@nestjs/jwt';

import { ConfigService, ConfigKeys } from '../common/config/config.service';
import { Public } from '../common/decorators/public.decorator';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Public()
  @Post('register')
  async register(@Request() req, @Body() newUser: Prisma.UserCreateInput) {
    const createdUser = await this.authService.register(newUser);

    const accessTokenKey = this.configService.get(ConfigKeys.ACCESS_TOKEN_KEY);
    const jwtPayload = { email: createdUser.email, userId: createdUser.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    req.user = {
      [accessTokenKey]: accessToken,
    };

    return {
      message: `${createdUser.firstName} ${createdUser.lastName} successfully registered`,
    };
  }
}
