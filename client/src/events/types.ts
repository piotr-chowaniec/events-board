import { Event, User } from '@common-packages/data-access-layer';

export type EventFormValues = {
  title: string;
  description: string;
  shortDescription: string;
  eventDate: string;
};

export type EventType = Event & {
  user: User;
  participants: Array<{ userId: string }>;
  _count: { participants: number };
};
