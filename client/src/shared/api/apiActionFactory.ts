import { useMutation } from 'react-query';

import { BodyType, RequestParamsType } from '../../services/fetchService';
import {
  addSuccessNotification,
  addErrorNotification,
} from '../../shared/notifications';

type ApiActionType = (
  requestParams: RequestParamsType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (body: BodyType) => Promise<any>;

type ApiActionFactoryParams = {
  apiAction: ApiActionType;
} & RequestParamsType;

const ApiActionFactory = ({
  apiAction,
  errorMessage,
  successMessage,
  parseResponseErrorMessage,
}: ApiActionFactoryParams) => {
  const requestMethod = async (body: BodyType) =>
    await apiAction({
      errorMessage,
      parseResponseErrorMessage,
    })(body);

  const options = {
    onSuccess: () => {
      successMessage && addSuccessNotification(successMessage);
    },
    onError: (error: Error) => {
      addErrorNotification(
        parseResponseErrorMessage ? error?.message : errorMessage,
      );
    },
  };

  const { mutateAsync, data, isLoading } = useMutation(requestMethod, options);

  return {
    call: mutateAsync,
    isLoading,
    data,
  };
};

export default ApiActionFactory;
