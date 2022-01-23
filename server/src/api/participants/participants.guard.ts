import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { ParticipantsService } from './participants.service';

@Injectable()
export class ParticipantsGuard implements CanActivate {
  constructor(private readonly participantsService: ParticipantsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request?.params?.userId;
    const eventId = request?.params?.eventId;
    const currentUserId = request?.user?.userId;
    const currentUserRole = request?.user?.role;

    if (!userId || !eventId || currentUserRole === 'ADMIN') {
      return true;
    }

    const existingParticipant = await this.participantsService.find(
      userId,
      eventId,
    );

    if (existingParticipant?.userId !== currentUserId) {
      throw new UnauthorizedException(
        'You do not have sufficient right to perform that operation',
      );
    }

    return true;
  }
}
