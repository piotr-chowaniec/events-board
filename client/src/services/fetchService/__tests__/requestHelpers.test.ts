import { applyQueryString } from '../requestHelpers';

describe('requestHelpers', () => {
  describe('applyQueryString()', () => {
    it('should add provided filters to route', () => {
      // given
      const route = '/some/route';
      const filters = {
        userId: 'some-user-id',
        status: 'PUBLISHED',
      };
      const expectedRoute = `${route}?userId=${filters.userId}&status=${filters.status}`;

      // when
      const result = applyQueryString({ route, filters });

      // then
      expect(result).toEqual(expectedRoute);
    });

    it('should skip not defined values', () => {
      // given
      const route = '/some/route';
      const filters = {
        userId: 'some-user-id',
        status: null,
      };
      const expectedRoute = `${route}?userId=${filters.userId}`;

      // when
      const result = applyQueryString({ route, filters });

      // then
      expect(result).toEqual(expectedRoute);
    });

    it('should return original route when there are no filters to apply', () => {
      // given
      const route = '/some/route';
      const filters = {};

      // when
      const result = applyQueryString({ route, filters });

      // then
      expect(result).toEqual(`${route}?`);
    });
  });
});
