import { useMutation } from 'react-query';

import { BodyType, RequestParamsType } from '../../services/fetchService';

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
  // successMessage,
  parseResponseErrorMessage,
}: ApiActionFactoryParams) => {
  const requestMethod = async (body: BodyType) =>
    await apiAction({
      errorMessage,
      parseResponseErrorMessage,
    })(body);

  // const options = {
  //   onSuccess: () => successMessage && dispatch(addSuccessNotification(successMessage)),
  //   onError: error => dispatch(addErrorNotification(
  //     parseResponseErrorMessage ? error?.message : errorMessage,
  //   )),
  // };

  const { mutate: call, data, isLoading } = useMutation(requestMethod);

  return {
    call,
    isLoading,
    data,
  };
};

export default ApiActionFactory;
