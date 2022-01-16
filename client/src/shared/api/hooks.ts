import apiActionFactory from './apiActionFactory';
import {
  loginUser,
  fetchProfileData,
  fetchUserName,
  updateUser,
  updatePassword,
  deleteUser,
} from './api';

export const useLogin = () =>
  apiActionFactory({
    apiAction: loginUser,
    parseResponseErrorMessage: true,
  });

export const useFetchProfileData = () =>
  apiActionFactory({
    apiAction: fetchProfileData,
  });

export const useFetchUserName = () =>
  apiActionFactory({
    apiAction: fetchUserName,
  });

export const useUpdateUser = () =>
  apiActionFactory({
    apiAction: updateUser,
    successMessage: 'User updated',
    errorMessage: 'Updating user data failed',
    parseResponseErrorMessage: true,
  });

export const useUpdatePassword = () =>
  apiActionFactory({
    apiAction: updatePassword,
    successMessage: 'Password updated',
    errorMessage: 'Updating password failed',
  });

export const useDeleteUser = () =>
  apiActionFactory({
    apiAction: deleteUser,
    successMessage: 'User removed',
    errorMessage: 'Removing user failed',
    parseResponseErrorMessage: true,
  });
