import { UserLoginDTO } from "@/domain/dto";
import { getCookie } from "@/utils/cookies";
import { FetchBaseQueryMeta, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDefaultResponse, IDispatcherResponse, ITokenResponse, IUserInfoResponse } from "@/domain/interfaces";

const BASE_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<IDefaultResponse<ITokenResponse<IDispatcherResponse>>, UserLoginDTO>({
      query: (body: UserLoginDTO) => ({
        url: "/login",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      transformResponse: (response: IDefaultResponse<ITokenResponse<IDispatcherResponse>>, meta: FetchBaseQueryMeta) => {

        console.log('response', response);
        if (meta?.response?.ok) {
          return response;
        }
        return response;
      }
    }),
    postLogout: builder.mutation<any, { token: string }>({
      query: (args) => ({

        url: `/user-token/${args?.token}`,
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getCookie('token')}`
        },
      }),
    }),
    getUserInfo: builder.query<IUserInfoResponse, void>({
      query: () => ({
        url: "/user-token/user-info",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getCookie('token')}`
        },
      })
    }),
  }),
});

export const { usePostLoginMutation, usePostLogoutMutation, useGetUserInfoQuery } = userApi;
