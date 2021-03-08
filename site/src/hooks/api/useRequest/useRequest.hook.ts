import { useCallback } from "react";

import { AxiosRequestConfig } from "axios";

import { methodsAvaibles } from "../../../constants";
import { useAxiosApiSangueNovo } from "../useAxios/useAxios.hook";

import { useAuthenticated } from "../..";

type Response = {
  get: (url?: string, data?: any) => Promise<any>;
  delete: (url?: string, data?: any) => Promise<any>;
  put: (url?: string, data?: any) => Promise<any>;
  patch: (url?: string, data?: any) => Promise<any>;
  post: (url?: string, data?: any) => Promise<any>;
};

export const useRequest = (path: string): Response => {
  const { request } = useAxiosApiSangueNovo();
  const { user } = useAuthenticated();

  const buildUrl = useCallback(
    (url?: string) => (url ? `${path}/${url}` : path),
    [path]
  );

  const buildHeaders = useCallback(() => {
    return {
      Authorization: `Bearer ${user?.token}`,
    };
  }, [user?.token]);

  const callApi = useCallback(
    async (method: string, url?: string, data?: any) => {
      const requestConfig = {
        data: data,
        method: method,
        url: buildUrl(url),
        headers: buildHeaders(),
      } as AxiosRequestConfig;
      try {
        return await request(requestConfig);
      } catch (err) {
        return err.response;
      }
    },
    [buildUrl, buildHeaders, request]
  );

  return {
    get: async (url?: string, data?: any): Promise<any> =>
      callApi(methodsAvaibles.get(), url, data),
    delete: async (url?: string, data?: any): Promise<any> =>
      callApi(methodsAvaibles.delete(), url, data),
    put: async (url?: string, data?: any): Promise<any> =>
      callApi(methodsAvaibles.put(), url, data),
    patch: async (url?: string, data?: any): Promise<any> =>
      callApi(methodsAvaibles.patch(), url, data),
    post: async (url?: string, data?: any): Promise<any> =>
      callApi(methodsAvaibles.post(), url, data),
  };
};
