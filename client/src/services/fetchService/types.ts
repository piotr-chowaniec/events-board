export enum AuthHeaders {
  ACCESS_TOKEN = 'access_token',
  AUTHORIZATION = 'authorization',
}

export type HeadersType = {
  [AuthHeaders.ACCESS_TOKEN]?: string;
  [AuthHeaders.AUTHORIZATION]?: string;
};

export type RequestParamsType = {
  errorMessage?: string;
  parseResponseErrorMessage?: boolean;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type BodyType = any;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ResponseType = any;
