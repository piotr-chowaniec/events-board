import { Event, User } from '@common-packages/data-access-layer';

import { ImageType } from '../shared/types';

export type EventFormValues = {
  title: string;
  description: string;
  shortDescription: string;
  eventDate: string;
  image?: ImageType;
};

export type EventType = Event & {
  user: User;
  participants: Array<{ userId: string }>;
  image?: ImageType;
  _count: { participants: number };
};
