import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UsersGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request?.params?.userId;
    const currentUserId = request?.user?.userId;
    const currentUserRole = request?.user?.role;

    if (!userId || currentUserRole === 'ADMIN') {
      return true;
    }

    if (userId !== currentUserId) {
      throw new UnauthorizedException(
        'You do not have sufficient right to perform that operation',
      );
    }

    return true;
  }
}
