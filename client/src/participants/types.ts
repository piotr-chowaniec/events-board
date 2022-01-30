import { Participant } from '@common-packages/data-access-layer';

import { ImageType } from '../shared/types';

export type ParticipantType = Participant & {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    image?: ImageType;
  };
  event: {
    title: string;
    eventDate: string;
    image?: ImageType;
  };
};
