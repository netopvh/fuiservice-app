import { getCookie } from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDashboardInfoResponse } from "./response";


const BASE_URL = process.env.REACT_APP_API_URL;

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDashboard: builder.query<IDashboardInfoResponse, void>({
            query: () => '/dashboard',
            transformErrorResponse: (response) => {
                return response;
            }
        }),
    })
});

export const { useGetDashboardQuery } = dashboardApi;