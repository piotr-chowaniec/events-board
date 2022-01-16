import { EVENT_STATUS } from '../shared/types';

type getFiltersType = {
  isAdmin: boolean;
  isCurrentUser: boolean;
  userId?: string;
};

export const getFilters = ({
  isAdmin,
  isCurrentUser,
  userId,
}: getFiltersType) => ({
  ...(isAdmin || isCurrentUser ? {} : { status: EVENT_STATUS.PUBLISHED }),
  ...(userId ? { userId } : {}),
});
