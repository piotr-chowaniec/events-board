import { transformToDateTimeLocal, transformToDate } from '../date';

describe('date formatters', () => {
  describe('transformToDateTimeLocal', () => {
    it('should transform string date to Date Time Local format', () => {
      // given
      const date = new Date('2022-02-22').toISOString();

      // when
      const formattedDate = transformToDateTimeLocal(date);

      // then
      expect(formattedDate).toEqual('2022-02-22T01:00');
    });

    it('should throw when provided string is not a date', () => {
      // given
      const invalidDate = 'invalid-date';

      // when, then
      expect(() => transformToDateTimeLocal(invalidDate)).toThrow();
    });
  });

  describe('transformToDate', () => {
    it('should transform string date to short format', () => {
      // given
      const date = new Date('2022-02-22').toISOString();

      // when
      const formattedDate = transformToDate(date);

      // then
      expect(formattedDate).toEqual('Tuesday, February 22nd, 2022 at 1:00 AM');
    });

    it('should transform string date to provided format', () => {
      // given
      const date = new Date('2022-02-22').toISOString();

      // when
      const formattedDate = transformToDate(date, 'MM/dd/yyyy');

      // then
      expect(formattedDate).toEqual('02/22/2022');
    });

    it('should throw when provided string is not a date', () => {
      // given
      const invalidDate = 'invalid-date';

      // when, then
      expect(() => transformToDate(invalidDate)).toThrow();
    });
  });
});
