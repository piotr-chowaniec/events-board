import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService, ConfigKeys } from '../common/config/config.service';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const accessTokenKey = this.configService.get(ConfigKeys.ACCESS_TOKEN_KEY);

    const jwtPayload = { email: user.email, userId: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      ...user,
      [accessTokenKey]: accessToken,
    };
  }
}
