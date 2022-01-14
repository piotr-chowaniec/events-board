import { format, parseISO } from 'date-fns';

export const SHORT_DATE_TIME_FORMAT = 'Pp';

export const transformToDateTimeLocal = (date: string): string => {
  const parsedIsoDate = parseISO(date);
  return format(parsedIsoDate, "yyyy-MM-dd'T'HH:mm");
};

type TransformToDate = (date: string, dateFormat?: string) => string;

export const transformToDate: TransformToDate = (
  date,
  dateFormat = 'PPPPp',
) => {
  const parsedIsoDate = parseISO(date);
  return format(parsedIsoDate, dateFormat);
};
