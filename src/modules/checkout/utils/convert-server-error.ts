type AxiosError = {
  response: {
    data: {
      message: { [key: string]: Array<string> };
    };
  };
};

export const convertServerError = (err: AxiosError) => {
  const { message = '' } = err?.response?.data || {};

  if (!message) return {};

  return Object.entries(message).reduce((acc, iterator) => {
    const [key, value] = iterator;

    const fieldKey = key.split('.').at(-1);

    if (!fieldKey) return acc;

    return { ...acc, [fieldKey]: value[0] };
  }, {});
};
