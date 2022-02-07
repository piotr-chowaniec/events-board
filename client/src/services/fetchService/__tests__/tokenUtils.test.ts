import { extractToken, storeToken, resetToken } from '../tokenUtils';
import { AuthHeaders } from '../types';

const key = AuthHeaders.ACCESS_TOKEN;

const storage: {
  [key: string]: string;
} = {
  [key]: '',
};

describe('tokenUtils', () => {
  const storageMock = {
    ...storage,
    length: 0,
    clear: jest.fn(),
    key: jest.fn(),
    getItem: jest.fn().mockImplementation((key: string) => storage[key]),
    setItem: jest.fn().mockImplementation((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: jest.fn().mockImplementation((key: string) => {
      delete storage[key];
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    storage[key] = 'some-token';
  });

  describe('extractToken()', () => {
    it('should return value from header', () => {
      // when
      const result = extractToken({
        headers: storage,
        key,
      });

      // then
      expect(result).toEqual(storage[key]);
    });

    it('should return value from storage', () => {
      // when
      const result = extractToken({
        storage: storageMock,
        key,
      });

      // then
      expect(result).toEqual(storage[key]);
      expect(storageMock.getItem).toHaveBeenCalledTimes(1);
    });

    it('should return undefiend when key is missing', () => {
      // when
      const result = extractToken({
        storage: storageMock,
        key: AuthHeaders.AUTHORIZATION,
      });

      // then
      // eslint-disable-next-line no-undefined
      expect(result).toBe(undefined);
      expect(storageMock.getItem).toHaveBeenCalledTimes(0);
    });
  });

  describe('storeToken()', () => {
    it('should set value from headers into storage', () => {
      // given
      const response = {
        headers: {
          [key]: 'new-token',
        },
      };

      // when
      storeToken({ key, storage: storageMock })(response);

      // then
      expect(storageMock.setItem).toHaveBeenCalledWith(
        key,
        response.headers[key],
      );
      expect(storage[key]).toEqual(response.headers[key]);
    });

    it('should not loose token when there is no new one in headers', () => {
      // given
      const response = {
        headers: {},
      };

      // when
      storeToken({ key, storage: storageMock })(response);

      // then
      expect(storageMock.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetToken()', () => {
    it('should remove key from storage', () => {
      // when
      resetToken({ key, storage: storageMock });

      // then
      expect(storage).toEqual({});
    });
  });
});
