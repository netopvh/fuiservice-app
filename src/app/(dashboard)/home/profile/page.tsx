'use client'

import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useLazyProfileQuery, useProfileQuery } from '@/redux/services/profileApi';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import MaskedInput from 'react-text-mask';
import LoadingButton from '@/components/LoadingButton';

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Nome é obrigatório'),
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    compay_name: yup
        .string()
        .required('Nome da empresa é obrigatório'),
    mobile: yup
        .string()
        .nullable()
        .matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Telefone inválido')
})

export default function Page() {

    const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);

    const [trigger, { data: user, isLoading }] = useLazyProfileQuery();

    useEffect(() => {
        trigger();
    }, []);

    async function submitForm(values: any, { setErrors }: FormikHelpers<any>) {
        console.log(values);
        // await postLogin(values)
        //     .unwrap()
        //     .then(async (data: IDefaultResponse<ITokenResponse<IDispatcherResponse>>) => {
        //         const token: Token = new Token(data.data.token);
        //         await setToken(token);
        //         replace(APP_ROUTES.private.dashboard);
        //     })
        //     .catch((error) => {
        //         setErrors({ email: error.data.message });
        //     });
    }

    return (
        <div className="panel" id="simple">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Informações do Perfil</h5>
            </div>
            <div className="mb-5">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    Suas Informações
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    Pagamentos
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    Suporte
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            {isLoading && <div>Carregando...</div>}
                            {user && (
                                <div className="active pt-5">
                                    <Formik
                                        validateOnChange={true}
                                        validationSchema={validationSchema}
                                        onSubmit={submitForm}
                                        initialValues={{
                                            name: user?.data.name,
                                            email: user?.data.email,
                                            company_name: user?.data.company_name,
                                            mobile: user?.data.mobile
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form noValidate autoComplete='off' className="space-y-5 dark:text-white" method='post'>
                                                <div className="mx-auto">
                                                    {user?.data.avatar ? (
                                                        <img src={user?.data.avatar} alt="Avatar" className="w-20 h-20 rounded-md object-cover" />
                                                    ) : (
                                                        <span className="flex justify-center text-white items-center w-20 h-20 text-center rounded-md object-cover bg-primary text-2xl">{user?.data.name_initials}</span>
                                                    )}

                                                </div>
                                                <div>
                                                    <label htmlFor="name">Nome do Responsável:</label>
                                                    <Field name="name" type="text" placeholder="Informe seu nome" className="form-input" />
                                                    <ErrorMessage name="name" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                                </div>
                                                <div>
                                                    <label htmlFor="company_name">Nome da Empresa:</label>
                                                    <Field name="company_name" type="text" placeholder="Informe o nome da empresa" className="form-input" />
                                                    <ErrorMessage name="company_name" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                                </div>
                                                <div>
                                                    <label htmlFor="email">Email:</label>
                                                    <div className="flex flex-1">
                                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            @
                                                        </div>
                                                        <Field name="email" type="email" placeholder="Informe seu e-mail" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    <ErrorMessage name="email" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                                </div>
                                                <div>
                                                    <label htmlFor="mobile">Telefone:</label>
                                                    <MaskedInput
                                                        name="mobile"
                                                        type="text"
                                                        required={false}
                                                        mask={['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                        placeholder="Informe o telefone"
                                                        className="form-input" />
                                                    <ErrorMessage name="mobile" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                                </div>
                                                <div className="max-w-xs">
                                                    <LoadingButton
                                                        type="submit"
                                                        loading={isSubmitting}
                                                        disabled={isSubmitting}
                                                        text='Salvar Informações'
                                                        className="btn btn-primary w-full" />
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <div className="flex items-start pt-5">
                                    <div className="flex-auto">
                                        <h5 className="mb-4 text-xl font-medium">Gerenciar Pagamentos</h5>
                                        <div className="mb-5">
                                            <p className="">
                                                Seu plano atual:
                                            </p>
                                        </div>
                                        <div className="mb-5">
                                            <div className="mx-auto max-w-[320px] dark:text-white-dark md:max-w-[1140px]">
                                                <div className="mt-5 flex justify-center space-x-4 text-center text-base font-semibold rtl:space-x-reverse md:mt-10">
                                                    <span className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}>Mensal</span>

                                                    <label className="relative h-6 w-12">
                                                        <input
                                                            id="custom_switch_checkbox1"
                                                            type="checkbox"
                                                            className="custom_switch peer absolute top-0 z-10 h-full w-full cursor-pointer opacity-0 ltr:left-0 rtl:right-0"
                                                            onChange={() => setYearlyPrice(!yearlyPrice)}
                                                        />
                                                        <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:bg-primary peer-checked:before:bg-[url(/assets/images/checked.svg)] ltr:before:left-1 ltr:peer-checked:before:left-7 rtl:before:right-1 rtl:peer-checked:before:right-7 dark:border-white-dark dark:before:bg-white-dark"></span>
                                                    </label>
                                                    <span className={`relative ${yearlyPrice ? 'text-primary' : ' text-white-dark'}  `}>
                                                        Anual
                                                        <span className="badge absolute my-auto hidden whitespace-nowrap rounded-full bg-success ltr:left-full ltr:ml-2 rtl:right-full rtl:mr-2">20% Off</span>
                                                    </span>
                                                </div>
                                                <div className="mt-5 space-y-4 text-white-dark md:mt-16 md:flex md:space-y-0">
                                                    <div className="rounded-md border border-white-light p-4 transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] dark:border-[#1b2e4b] ltr:md:rounded-r-none ltr:md:border-r-0 rtl:md:rounded-l-none rtl:md:border-l-0 lg:p-9">
                                                        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white-light">Básico</h3>
                                                        <p>Ideal para pequenos negócios e prestadores de serviços.</p>
                                                        <div className="my-7 p-2.5 text-center text-lg">
                                                            <strong className="text-xl text-[#3b3f5c] dark:text-white-light lg:text-3xl">R$ 99,90</strong> / Mês
                                                        </div>
                                                        <div className="mb-6">
                                                            <ul className="space-y-3">
                                                                <li>Imagens Street View: 1</li>
                                                            </ul>
                                                        </div>
                                                        <button type="button" className="btn btn-dark w-full">
                                                            Assinar agora
                                                        </button>
                                                    </div>
                                                    <div className="relative rounded-t-md border border-white-light p-4 pt-14 transition-all duration-300 dark:border-[#1b2e4b] lg:p-9">
                                                        <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-center rounded-t-md bg-primary text-base text-white md:-top-[30px]">Mais Popular</div>
                                                        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white-light">VIP</h3>
                                                        <p>Ideal para pequenas e médias empresas<br /> que querem mais um excelente canal de vendas</p>
                                                        <div className="my-7 p-2.5 text-center text-lg">
                                                            <strong className="text-xl text-primary lg:text-4xl">R$ 149,90</strong> / Mês
                                                        </div>
                                                        <div className="mb-6">
                                                            <ul className="space-y-3">
                                                                <li>Imagens Street View: 3</li>
                                                            </ul>
                                                        </div>
                                                        <button type="button" className="btn btn-primary w-full">
                                                            Assinar agora
                                                        </button>
                                                    </div>
                                                    <div className="rounded-md border border-white-light p-4 transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] dark:border-[#1b2e4b] ltr:md:rounded-l-none ltr:md:border-l-0 rtl:md:rounded-r-none rtl:md:border-r-0 lg:p-9">
                                                        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white-light">Executive</h3>
                                                        <p>Para médias e grandes empresas que <br />querem mais engajamento e vendas.</p>
                                                        <div className="my-7 p-2.5 text-center text-lg">
                                                            <strong className="text-xl text-[#3b3f5c] dark:text-white-light lg:text-3xl">$199,90</strong> / Mês
                                                        </div>
                                                        <div className="mb-6">
                                                            <ul className="space-y-3">
                                                                <li>Imagens Street View: 5</li>
                                                            </ul>
                                                        </div>
                                                        <button type="button" className="btn btn-dark w-full">
                                                            Assinar agora
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="pt-5">
                                <p>
                                    Entre em contato com nosso suporte.
                                </p>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>

    )
}
