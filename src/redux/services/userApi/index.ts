import { UserLoginDTO, UserRegisterDTO } from "@/domain/dto";
import { getCookie } from "@/utils/cookies";
import { FetchBaseQueryMeta, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDefaultResponse, IDispatcherResponse, ITokenResponse } from "@/domain/interfaces";

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
          'Accept': 'application/json',
        },
        body,
      }),
      transformResponse: (response: IDefaultResponse<ITokenResponse<IDispatcherResponse>>, meta: FetchBaseQueryMeta) => {
        return response;
      }
    }),
    postRegister: builder.mutation<IDefaultResponse<IDispatcherResponse>, UserRegisterDTO>({
      query: (body: UserRegisterDTO) => ({
        url: "/register",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    postLogout: builder.mutation<any, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
      }),
    }),
    getUserInfo: builder.query<IDefaultResponse<IDispatcherResponse>, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
      })
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation, usePostLogoutMutation, useGetUserInfoQuery, useLazyGetUserInfoQuery } = userApi;
