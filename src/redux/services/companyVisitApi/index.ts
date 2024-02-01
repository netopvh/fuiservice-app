import { getCookie } from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const BASE_URL = process.env.REACT_APP_API_URL;

export const companyVisitApi = createApi({
    reducerPath: "companyVisitApi",
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
        getCompanyVisit: builder.query<any, {start: string, end: string}>({
            query: (args) => {

                const { start, end } = args || {};
                return {
                    url: `/company-visit/${start}/${end}`,
                    method: 'GET',
                }
            },
            transformErrorResponse: (response) => {
                return response;
            }
        }),
    })
});

export const { useGetCompanyVisitQuery } = companyVisitApi;