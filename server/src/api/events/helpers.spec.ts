import { getFilters } from './helpers';

const userId = 'user-1';
const status = 'STATUS-1';
const participant = 'participant-1';

const expectedParticipantFilter = {
  participants: {
    some: {
      userId: participant,
    },
  },
};

describe('getFilters()', () => {
  it('should return user filter', () => {
    // given
    const params = { userId };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId });
  });

  it('should return status filter', () => {
    // given
    const params = { status };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ status });
  });

  it('should return participant filter', () => {
    // given
    const params = { participant };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ ...expectedParticipantFilter });
  });

  it('should return filters', () => {
    // given
    const params = { userId, status, participant };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId, status, ...expectedParticipantFilter });
  });

  it('should not pass through any unwanted values', () => {
    // given
    const params = { userId, randomValue: 123 };

    // when
    const filters = getFilters(params);

    // then
    expect(filters).toEqual({ userId });
  });
});
