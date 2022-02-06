import { getFilters } from '../helpers';

const userId = 'user-1';
const eventId = 'event-1';

describe('getFilters()', () => {
  it('should return user filter', () => {
    // given
    const params = { userId };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId });
  });

  it('should return event filter', () => {
    // given
    const params = { eventId };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ eventId });
  });

  it('should return user and event filter', () => {
    // given
    const params = { userId, eventId };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId, eventId });
  });

  it('should not pass through any unwanted values', () => {
    // given
    const params = { userId, eventId, randomValue: 123 };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId, eventId });
  });
});
