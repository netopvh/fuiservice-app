import { getCookie } from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const BASE_URL = process.env.REACT_APP_API_URL;

export const companyApi = createApi({
    reducerPath: "companyApi",
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
        getCompany: builder.query<any, void>({
            query: () => '/company',
            transformErrorResponse: (response) => {
                return response;
            }
        }),
    })
});

export const { useLazyGetCompanyQuery } = companyApi;