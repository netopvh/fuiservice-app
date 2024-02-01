'use client'
import { IProductRequest } from '@/domain/interfaces';
import { usePostCreateProductMutation } from '@/redux/services/productsApi';
import { castValue } from '@/utils/commom';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProductForm from '../_forms/ProductForm';

interface IProductDTO {
    description: string;
    info?: string;
    category: string;
    price: string | number;
    active: boolean;
    service: boolean;
    showcase: boolean;
    stockManagement: boolean;
    stock?: string;
}

export default function Page() {


    const [postProductCreate, { isLoading }] = usePostCreateProductMutation();
    const { push } = useRouter();

    const onSubmit = async (values: IProductDTO, { setErrors }: FormikHelpers<any>): Promise<void> => {
        const data = {
            ...values,
            price: castValue(values.price, 'number'),
            stock: castValue(values.stock, 'number'),
            category: {
                id: values.category,
            }
        } as IProductRequest;
        console.log(data);

        await postProductCreate(data)
            .unwrap()
            .then((res) => {
                console.log(res);
                push('/home/products');
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className='w-3/4'>
            <div className="panel">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <div className="text-lg font-bold">Cadastrar Produto</div>

                </div>
                <div className="p-5">
                    <ProductForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
