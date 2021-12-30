import apiActionFactory from './apiActionFactory';
import { loginUser, fetchUser } from './api';

export const useLogin = () =>
  apiActionFactory({
    apiAction: loginUser,
    // successMessage: 'Successfully logged in',
    parseResponseErrorMessage: true,
  });

export const useFetchUser = () =>
  apiActionFactory({
    apiAction: fetchUser,
    // successMessage: 'Successfully registered',
    parseResponseErrorMessage: true,
  });
