import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "@/utils/cookies";
import { IDefaultResponse, ITripResponse } from "@/domain/interfaces";

const BASE_URL = process.env.REACT_APP_API_URL;

interface IGetTripsArgs {
    type: string;
}

export const tripsApi = createApi({
    reducerPath: "tripsApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTrips: builder.query<IDefaultResponse<ITripResponse[]>, IGetTripsArgs>({
            query: (args) => {
                const { type } = args || {};
                return {
                    url: `/trips?type=${type}`,
                    method: 'GET',
                }
            },
            keepUnusedDataFor: 0,
            transformErrorResponse: (response) => {
                return response;
            }
        })
    })
});

export const { useGetTripsQuery, useLazyGetTripsQuery } = tripsApi;