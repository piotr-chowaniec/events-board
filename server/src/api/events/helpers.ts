export type EventFiltersParams = {
  userId?: string;
  status?: string;
  participant?: string;
};

export const getFilters = ({
  userId,
  status,
  participant,
}: EventFiltersParams) => ({
  ...(userId ? { userId } : {}),
  ...(status ? { status: status.toUpperCase() } : {}),
  ...(participant
    ? {
        participants: {
          some: {
            userId: participant,
          },
        },
      }
    : {}),
});
