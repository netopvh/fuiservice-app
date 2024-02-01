'use client'
import FormikCurrencyInput from '@/components/FormikCurrencyInput'
import FormikReactSelect from '@/components/FormikReactSelect'
import { IProduct } from '@/domain/entities/product'
import { IProductCategory } from '@/domain/entities/product-category'
import { useGetCategoriesQuery } from '@/redux/services/productCategoryApi'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';

interface ISelectProps {
    value: number;
    label: string;
}

interface IFormValues {
    description: string;
    info: string;
    category: number;
    price: string;
    stock: string;
    active: boolean;
    showcase: boolean;
    service: boolean;
    stockManagement: boolean;
}

const validationSchema = yup.object({
    description: yup
        .string()
        .required('A descrição é obrigatória'),
    category: yup
        .string()
        .required('Categoria é obrigatório'),
    price: yup
        .mixed()
        .required('Preço é obrigatório'),
});

interface iProps {
    product?: IProduct;
    edit?: boolean;
    onSubmit: any;
}

export default function ProductForm({ product, edit, onSubmit }: iProps) {

    const [categoryData, setCategoryData] = useState<ISelectProps[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [initialValues, setInitialValues] = useState<IFormValues>({
        description: '',
        info: '',
        stockManagement: false,
        category: 0,
        price: '',
        stock: '',
        active: true,
        showcase: false,
        service: false,
    } as IFormValues);
    const { data: categories } = useGetCategoriesQuery({ name: '' });

    const { push } = useRouter();

    useEffect(() => {
        function getData() {
            if (!edit) {
                setLoaded(true);
                return;
            }

            if (product && product.id) {
                const data = {
                    ...product,
                    category: product.category.id,
                    price: product.price.toFixed(2),
                    stock: product.stock ? product.stock.toFixed(2) : '',
                } as IFormValues;

                setInitialValues(data);
                setLoaded(true);
            }
        }
        getData();
    }, [product, edit]);

    useEffect(() => {
        function getCategories() {
            if (categories) {
                const data = categories.map((item: IProductCategory) => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                });
                setCategoryData(data);
            }
        }
        getCategories();
    }, [categories]);

    return loaded ? (
        <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >
            {({ isSubmitting, values }) => (
                <Form noValidate autoComplete="off" method="post">
                    <div className="relative mb-4">
                        <label htmlFor="description">Descrição:</label>
                        <Field name="description" className="form-input ltr:pl-2 rtl:pr-10" id="description" />
                        <ErrorMessage name="description" component="div" className="text-danger text-sm mt-1" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="info">Observação:</label>
                        <Field name="info" className="form-input ltr:pl-2 rtl:pr-10" id="info" />
                        <ErrorMessage name="info" component="div" className="text-danger text-sm mt-1" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="category">Categoria:</label>
                        <FormikReactSelect
                            id="category"
                            placeholder="Selecione uma categoria"
                            name="category"
                            isMulti={false}
                            options={categoryData}
                        />
                        <ErrorMessage name="category" component="div" className="text-danger text-sm mt-1" />
                    </div>
                    <div className="relative mb-5">
                        <label htmlFor="price">Preço:</label>
                        <FormikCurrencyInput
                            className='max-w-xs'
                            name="price"
                            id="price"
                            prefix="R$" />
                        <ErrorMessage name="price" component="div" className="text-danger text-sm mt-1" />
                    </div>
                    <div className="relative mb-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <label className="inline-flex">
                                <Field type="checkbox" name="active" className="form-checkbox" />
                                <span>Ativo</span>
                            </label>
                            <label className="inline-flex">
                                <Field type="checkbox" name="showcase" className="form-checkbox" />
                                <span>Vitrine</span>
                            </label>
                            <label className="inline-flex">
                                <Field type="checkbox" name="service" className="form-checkbox" />
                                <span>Serviço</span>
                            </label>
                            <label className="inline-flex">
                                <Field type="checkbox" name="stockManagement" className="form-checkbox" />
                                <span>Controla Estoque</span>
                            </label>
                        </div>
                    </div>
                    {values.stockManagement && (
                        <div className="relative max-w-xs mb-5">
                            <label htmlFor="stock">Quantidade no Estoque:</label>
                            <FormikCurrencyInput
                                className='max-w-xs'
                                name="stock"
                                id="stock"
                                prefix="" />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary max-w-sm">
                            {isSubmitting ? 'Salvando...' : edit ? 'Atualizar' : 'Cadastrar'}
                        </button>
                        <button type="button" className="btn btn-danger max-w-xs" onClick={() => push('/home/products')}>
                            Cancelar
                        </button>
                    </div>
                </Form>
            )}
        </Formik>) : <div>Loading</div>
}
