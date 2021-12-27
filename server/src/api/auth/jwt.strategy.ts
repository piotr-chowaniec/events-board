import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import config from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(
        config.authentication.authorizationKey,
      ),
      ignoreExpiration: false,
      secretOrKey: config.authentication.jwtSecretKey,
    });
  }

  async validate(payload: any) {
    const jwtPayload = { email: payload.email, userId: payload.userId };
    const refreshToken = this.jwtService.sign(jwtPayload);

    return {
      userId: payload.userId,
      email: payload.email,
      [config.authentication.refreshTokenKey]: refreshToken,
    };
  }
}
