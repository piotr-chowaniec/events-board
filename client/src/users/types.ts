import { User } from '@common-packages/data-access-layer';

import { ImageType } from '../shared/types';

export type UserType = User & {
  image?: ImageType;
  _count: { events: number; participants: number };
};

export type UserEditFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
