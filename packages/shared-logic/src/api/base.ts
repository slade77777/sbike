import {default as axios, AxiosInstance} from 'axios';
export let secureInstance: AxiosInstance;

export function setSecureAxiosInstance(baseURL: string) {
  if (!baseURL) {
    throw new Error(
      'Unable to resolve Base URL. Ensure that the environment variable is properly set up',
    );
  }
  const timeout = 20000;
  secureInstance = axios.create({
    timeout,
    baseURL,
    // by default axios will throw exception when: !(200 <= statusCode < 300)
    // we config for axios should not throw exception in any status, so that we no-need to try catch on `actions.tsx` file
    validateStatus: function (_status) {
      return true;
    },
  });

  secureInstance.interceptors.response.use(
    function (response) {
      if (response.status !== 200) {
        return Promise.reject(response.data);
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
}

export function setToken(session: string): void {
  secureInstance.defaults.headers = {
    API_KEY: session,
  };
}
