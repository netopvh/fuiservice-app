'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '../_forms/ProductForm'
import { useGetProductByIdQuery, useLazyGetProductByIdQuery, usePostUpdateProductMutation } from '@/redux/services/productsApi'
import { FormikHelpers } from 'formik';
import { castValue } from '@/utils/commom';
import { IProductDTO, IProductRequest } from '@/domain/interfaces';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/domain/entities/product';

type Params = {
    params: {
        productId: number;
    }
}

export default function Page({ params: { productId } }: Params) {

    const [data, setData] = useState<IProduct>({} as IProduct);
    const [triggerGetProduct, { error, isLoading: isLoadingGetProduct }] = useLazyGetProductByIdQuery();
    const [postProducUpdate, { isLoading }] = usePostUpdateProductMutation();

    const { push } = useRouter();

    useEffect(() => {
        async function getProduct() {
            await triggerGetProduct(productId)
                .unwrap()
                .then((res) => {
                    setData({
                        ...res
                    })
                })
        }
        getProduct();
    }, [productId, triggerGetProduct]);

    const onSubmit = async (values: IProductDTO, { setErrors }: FormikHelpers<any>): Promise<void> => {
        const data = {
            ...values,
            price: castValue(values.price, 'number'),
            stock: castValue(values.stock, 'number'),
            category: {
                id: values.category,
            }
        } as IProductRequest;
        await postProducUpdate(data)
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
                    <div className="text-lg font-bold">Alterar Produto</div>

                </div>
                <div className="p-5">
                    <ProductForm product={data} edit={true} onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
