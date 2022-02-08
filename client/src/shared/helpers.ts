import { Event } from '@common-packages/data-access-layer';

import { EVENT_STATUS } from './types';

export const getIsPublished = (event: Event) =>
  event.status === EVENT_STATUS.PUBLISHED;
export const getIsDraft = (event: Event) => event.status === EVENT_STATUS.DRAFT;

export const pluralize = (val: number, word: string): string => {
  const pluralized = `${word}s`;
  return [1].includes(val) ? word : pluralized;
};
