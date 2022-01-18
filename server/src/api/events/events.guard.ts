import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { EventsService } from './events.service';

@Injectable()
export class EventsGuard implements CanActivate {
  constructor(private readonly eventsService: EventsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const eventId = request?.params?.eventId;
    const currentUserId = request?.user?.userId;
    const currentUserRole = request?.user?.role;

    if (!eventId || currentUserRole === 'ADMIN') {
      return true;
    }

    const existingEvent = await this.eventsService.find(eventId);

    if (existingEvent?.userId !== currentUserId) {
      throw new UnauthorizedException(
        'You do not have sufficient right to perform that operation',
      );
    }

    return true;
  }
}
