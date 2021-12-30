import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { config, ConfigKeys } from '../config/config.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        const { user } = res.req;

        const accessToken =
          user?.[config[ConfigKeys.REFRESH_TOKEN_KEY]] ||
          user?.[config[ConfigKeys.ACCESS_TOKEN_KEY]];

        if (accessToken) {
          res.header(config[ConfigKeys.ACCESS_TOKEN_KEY], accessToken);
        }

        return data;
      }),
    );
  }
}
