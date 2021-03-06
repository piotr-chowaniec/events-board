import { createSelector } from 'reselect';

import { RootState } from '../index';

export const userInitializedSelector = (state: RootState) =>
  state.user.initialized;

export const userDataSelector = (state: RootState) => state.user.user;

export const userDisplayNameSelector = createSelector(
  [userDataSelector],
  (user) => (user?.firstName ? `${user?.firstName} ${user?.lastName}` : ''),
);

export const isAuthenticatedSelector = createSelector(
  [userDataSelector],
  (user) => Boolean(user?.id),
);

export const isAdminSelector = createSelector(
  [userDataSelector],
  (user) => user?.role === 'ADMIN',
);
