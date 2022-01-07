import apiActionFactory from '../../shared/api/apiActionFactory';

import { registerUser } from './api';

export const useRegister = () =>
  apiActionFactory({
    apiAction: registerUser,
    successMessage: 'Successfully registered',
    parseResponseErrorMessage: true,
  });
