import { IProductCategory } from "@/domain/entities/product-category";
import { IProductResponse } from "@/domain/response";
import { getCookie } from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const BASE_URL = process.env.REACT_APP_API_URL;

export const productCategoryApi = createApi({
    reducerPath: "productCategoryApi",
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
        getCategories: builder.query<IProductCategory[], {name: string}>({
            query: (args) => {
                    
                    const { name } = args || {};

                    return {
                        url: `/product-category/list/${name}`,
                        method: 'GET',
                    }
            },
            transformErrorResponse: (response) => {
                return response;
            }
        }),
    })
});

export const { useGetCategoriesQuery } = productCategoryApi;