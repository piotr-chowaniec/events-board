import { toast, ToastContent, ToastOptions } from 'react-toastify';

type AddToast = (
  toastType: 'info' | 'success' | 'warning' | 'error',
) => (content: ToastContent, options?: ToastOptions) => string | number;

const addToast: AddToast =
  (toastType) =>
  (content, options = {}) =>
    toast[toastType](content, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      ...options,
    });

export const addSuccessNotification = addToast('success');
export const addErrorNotification = addToast('error');
