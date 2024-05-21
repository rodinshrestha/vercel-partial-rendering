import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export type AxiosErrorMessage = AxiosError<ServerErrorMessageType, unknown>;

export type ServerErrorMessageType = {
  message: string | { [key: string]: Array<string> };
};

export const axiosErrMsg = (err: AxiosErrorMessage) => {
  const message = err.response?.data.message;

  if (typeof message === 'string') return message;

  if (typeof message === 'object' && Object.keys(message).length) {
    for (const property in message) {
      return message[property][0];
    }
  }

  if (err.response?.status === 403) return 'Unauthorized';
  return 'Server  error';
};

const toastAlert = (
  msg: string | AxiosErrorMessage | unknown,
  type: 'success' | 'error' | 'custom-error',
  toastID?: string,
  options?: Record<any, any>
): void => {
  if (type === 'success') {
    toast.success(msg as string, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: toastID,
      ...options,
    });
  } else if (type === 'error') {
    const message = axiosErrMsg(msg as AxiosErrorMessage);
    if (typeof message === 'string')
      toast.error(message, {
        position: 'top-right',
        icon: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        toastId: toastID,
        ...options,
      });
    else {
      for (const el of Object.values(message)) {
        toast.error((el as []).toString(), {
          position: 'top-right',
          icon: false,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          toastId: toastID,
        });
      }
    }
    //Custom error
  } else {
    toast.error(msg as string, {
      position: 'top-right',
      icon: false,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: toastID,
      ...options,
    });
  }
};

export default toastAlert;
