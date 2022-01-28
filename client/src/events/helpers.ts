import { EVENT_STATUS } from '../shared/types';

type getFiltersType = {
  isAdmin?: boolean;
  isCurrentUser?: boolean;
  userId?: string;
  participant?: string;
};

export const getFilters = ({
  isAdmin,
  isCurrentUser,
  userId,
  participant,
}: getFiltersType) => ({
  ...(isAdmin || isCurrentUser ? {} : { status: EVENT_STATUS.PUBLISHED }),
  ...(userId ? { userId } : {}),
  ...(participant ? { participant } : {}),
});
