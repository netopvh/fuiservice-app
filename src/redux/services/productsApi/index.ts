import { IProduct } from "@/domain/entities/product";
import { IProductRequest } from "@/domain/interfaces";
import { IProductResponse } from "@/domain/response";
import { getCookie } from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const BASE_URL = process.env.REACT_APP_API_URL;

interface IGetProductsArgs {
    showcase: boolean;
    description: string;
    page: number;
    size: number;
    sort: string;
}

export const productsApi = createApi({
    reducerPath: "productsApi",
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
        getProducts: builder.query<IProductResponse, IGetProductsArgs>({
            query: (args) => {
                    
                    const { showcase, description, page, size, sort } = args || {};
                    return {
                        url: `/product/list/${showcase}/${description}?page=${page}&size=${size}&sort=${sort}`,
                        method: 'GET',
                    }
            },
            keepUnusedDataFor: 0,
            transformErrorResponse: (response) => {
                return response;
            }
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                    method: 'GET',
                }
            }
        }),
        postCreateProduct: builder.mutation<{id: number, description: string}, IProductRequest>({
            query: (product) => {
                return {
                    url: `/product`,
                    method: 'POST',
                    body: product
                }
            }
        }),
        postUpdateProduct: builder.mutation({
            query: ({id, ...rest}) => {
                return {
                    url: `/product/${id}`,
                    method: 'PUT',
                    body: rest
                }
            }
        }),
    })
});

export const { useGetProductsQuery, useLazyGetProductByIdQuery, useGetProductByIdQuery, usePostCreateProductMutation, usePostUpdateProductMutation } = productsApi;