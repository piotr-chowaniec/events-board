export type ParticipantFiltersParams = {
  eventId?: string;
};

export const getFilters = ({ eventId }: ParticipantFiltersParams) => ({
  ...(eventId ? { eventId } : {}),
});
