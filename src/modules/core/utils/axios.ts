import axios from "axios";

const createAxiosInstance = (baseURL: string | undefined) =>
  axios.create({
    baseURL,
  });

const publicAxios = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL);

const careAxios = createAxiosInstance(process.env.NEXT_PUBLIC_CARE_API_URL);

publicAxios.interceptors.request.use(
  async (config) => {
    // TODO: Add validation for config header
    // check for channel , store & area

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

publicAxios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

careAxios.interceptors.request.use(
  async (config) => {
    // TODO: Add validation for config header
    // check for channel , store & area

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

careAxios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { publicAxios, careAxios };
