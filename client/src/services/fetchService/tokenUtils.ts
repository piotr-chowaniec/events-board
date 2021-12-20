import { AuthHeaders, HeadersType, ResponseType } from './types';

type ExtractTokenType = (options?: {
  headers?: HeadersType & {
    has: (key: string) => boolean;
    get: (key: string) => string;
  };
  key?: AuthHeaders;
  storage?: Storage;
}) => string | null | undefined;

type StoreTokenType = (options?: {
  key?: AuthHeaders;
  storage?: Storage;
}) => (response: ResponseType) => ResponseType;

type ResetTokenType = (options?: {
  key?: AuthHeaders;
  storage?: Storage;
}) => void;

const extractToken: ExtractTokenType = ({
  headers,
  key = AuthHeaders.ACCESS_TOKEN,
  storage = window.localStorage,
} = {}) => {
  if (headers?.has && headers.has(key)) {
    return headers.get(key);
  }

  if (key in storage) {
    return storage.getItem(key);
  }
};

const storeToken: StoreTokenType =
  ({ key = AuthHeaders.ACCESS_TOKEN, storage = window.localStorage } = {}) =>
  (response) => {
    const renewedToken = extractToken({
      key,
      storage,
      headers: response?.headers,
    });

    if (renewedToken) {
      storage.setItem(key, renewedToken);
    }

    return response;
  };

const resetToken: ResetTokenType = ({
  key = AuthHeaders.ACCESS_TOKEN,
  storage = window.localStorage,
} = {}) => storage.removeItem(key);

export { resetToken, storeToken, extractToken };
