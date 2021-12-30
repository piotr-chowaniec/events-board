import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { ConfigService, ConfigKeys } from '../common/config/config.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      this.configService.get(ConfigKeys.PUBLIC_KEY),
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
