import { User } from '@common-packages/data-access-layer';

export const mapUserToResponse = (user: User) => ({
  ...user,
  password: 'encrypted',
});
