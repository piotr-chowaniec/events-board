import axios, { Method, AxiosResponse } from 'axios';

import { HeadersType } from './types';

export const postHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const axiosInstance = axios.create({
  baseURL: '/api',
});

type FetchServiceCreator = (
  url: string,
  method: Method,
  params?: {
    headers?: HeadersType;
    body?: string;
  },
) => Promise<AxiosResponse>;

const fetchServiceCreator: FetchServiceCreator = async (
  url,
  method,
  params = {},
) => {
  const options = {
    ...params,
    method,
  };

  return axiosInstance(url, options);
};

export default fetchServiceCreator;
