export type ImageFiltersParams = { userId?: string; eventId?: string };

export const getFilters = ({ userId, eventId }: ImageFiltersParams) => ({
  ...(userId ? { userId } : {}),
  ...(eventId ? { eventId } : {}),
});
