import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import config from '../../../config';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        const { user } = res.req;

        const accessToken =
          user?.[config.authentication.refreshTokenKey] ||
          user?.[config.authentication.accessTokenKey];

        if (accessToken) {
          res.header(config.authentication.accessTokenKey, accessToken);
        }

        return data;
      }),
    );
  }
}
