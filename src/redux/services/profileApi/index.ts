import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDefaultResponse, IDispatcherResponse, IUploadResponse } from "@/domain/interfaces";
import { getCookie, removeCookie } from "@/utils/cookies";


const BASE_URL = process.env.REACT_APP_API_URL;

export const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
        const token = getCookie('token');
        if (token) {
            headers.set('Accept', 'application/json'),
                headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    },
});

export const baseQueryWithRedirect: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        removeCookie('token')
        window.location.href = '/login';
    }
    return result;
}

export const profileApi = createApi({
    reducerPath: "profileApi",
    refetchOnFocus: true,
    baseQuery: baseQueryWithRedirect,
    endpoints: (builder) => ({
        uploadImage: builder.mutation<IDefaultResponse<IUploadResponse>, FormData>({
            query: (file) => ({
                url: "/profile/upload",
                method: "POST",
                body: file,
            }),
        }),
        updateProfile: builder.mutation<IDefaultResponse<IDispatcherResponse>, FormData>({
            query: (data) => ({
                url: "/profile",
                method: "PUT",
                body: data,
            }),
        }),
        profile: builder.query<IDefaultResponse<IDispatcherResponse>, void>({
            query: () => ({
                url: "/profile",
                method: "GET",
            })
        }),
    }),
});

export const { useProfileQuery, useLazyProfileQuery, useUploadImageMutation } = profileApi;
