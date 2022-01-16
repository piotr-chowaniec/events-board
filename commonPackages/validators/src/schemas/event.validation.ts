import * as Yup from 'yup';
import { isDate, parseISO, format } from 'date-fns';

const transformToDate = (value: string, originalValue: string) =>
  isDate(originalValue) ? originalValue : parseISO(originalValue);

const event = Yup.object().shape({
  title: Yup.string()
    .label('Title')
    .required()
    .min(5, 'Event title must be at least 5 characters long'),
  description: Yup.string().label('Description'),
  shortDescription: Yup.string().label('Short description'),
  eventDate: Yup.date()
    .label('Date and Time')
    .required()
    .transform(transformToDate)
    .min(
      format(new Date(), 'yyyy-MM-dd'),
      'You need to choose future date. Or are you a time traveler?',
    ),
});

const eventStatus = Yup.object().shape({
  status: Yup.string()
    .label('Status')
    .required()
    .oneOf(['DRAFT', 'PUBLISHED', 'CANCELED']),
});

export default {
  event,
  eventStatus,
};
