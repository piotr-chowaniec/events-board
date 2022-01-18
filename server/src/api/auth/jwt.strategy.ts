import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService, ConfigKeys } from '../common/config/config.service';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(
        configService.get(ConfigKeys.AUTHORIZATION_KEY),
      ),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigKeys.JWT_SECRET_KEY),
    });
  }

  async validate(payload: any) {
    const { email, userId } = payload;
    const role = await this.authService.getUserRole(email);

    const refreshTokenKey = this.configService.get(
      ConfigKeys.REFRESH_TOKEN_KEY,
    );

    const jwtPayload = { email, userId };
    const refreshToken = this.jwtService.sign(jwtPayload);

    return {
      userId: payload.userId,
      email: payload.email,
      role,
      [refreshTokenKey]: refreshToken,
    };
  }
}
