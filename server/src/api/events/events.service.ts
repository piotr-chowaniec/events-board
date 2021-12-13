import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  findAll() {
    return {
      message: 'Say Hello from events service',
    };
  }
}
