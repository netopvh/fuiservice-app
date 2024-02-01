'use client'
import FormikMaskInput from '@/components/FomikMaskInput';
import FormikReactSelect from '@/components/FormikReactSelect';
import { useLazyGetCompanyQuery } from '@/redux/services/companyApi';
import { getCookie } from '@/utils/cookies';
import { ProfileUtils } from '@/utils/profileUtils';
import { Tab } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { get } from 'http';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import * as yup from 'yup';

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

export default function Page() {

    const [loaded, setLoaded] = useState(false);
    const [initialValues, setInitialValues] = useState({} as any);
    const [triggerCompany, { data: companyData }] = useLazyGetCompanyQuery();

    const { push } = useRouter();

    useEffect(() => {
        const getData = async () => {
            const isAdmin = ProfileUtils.isAdmin(getCookie('roles'));
            const isCompany = ProfileUtils.isCompany(getCookie('roles'));
            const isPref = ProfileUtils.isPref(getCookie('roles'));

            // TODO: Futuramente implementar as regras para exibição de Prefeitura de Admin

            if (isCompany) {
                await triggerCompany()
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        setInitialValues(res);
                        setLoaded(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        getData();
    }, [triggerCompany]);

    const onSubmit = async (values: any, { setErrors }: any): Promise<void> => {
        console.log(values);
    }

    return (
        <div className='w-full'>
            <div className="panel">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <div className="text-lg font-bold">Informações Cadastrais</div>

                </div>
                <div className="py-4">
                    {loaded ? (
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit} >
                            {({ isSubmitting, values }) => (
                                <Form noValidate autoComplete="off" method="post">
                                    <div className="mb-5 flex flex-col sm:flex-row">
                                        <Tab.Group>
                                            <div className="mb-5 w-1/4 sm:mb-0">
                                                <Tab.List className="m-auto flex flex-col justify-center space-y-2">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Dados Gerais</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Endereço</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Acesso</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Frete</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Expediente</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Images</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Avaliações</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? '!bg-indigo-700 text-white !outline-none' : ''} block p-3.5 text-center py-2 transition-all duration-300 hover:bg-indigo-700 hover:text-white w-full`}
                                                            >
                                                                <span className="font-bold text-md">Emblemas</span>
                                                            </button>
                                                        )}
                                                    </Tab>
                                                </Tab.List>
                                            </div>
                                            <div className="w-3/4">
                                                <Tab.Panels className="border-l">
                                                    <Tab.Panel>
                                                        {({ selected }) => (
                                                            <div className={`${selected ? 'active' : ''} p-3`}>
                                                                <div className="relative mb-4">
                                                                    <label htmlFor="name">Nome da Empresa: <span className="text-danger text-xs">*</span></label>
                                                                    <Field name="name" className="form-input ltr:pl-2 rtl:pr-10" id="name" />
                                                                    <ErrorMessage name="name" component="div" className="text-danger text-sm mt-1" />
                                                                </div>

                                                                <div className="relative mb-4">
                                                                    <label htmlFor="fantasyName">Nome Fantasia: <span className="text-danger text-xs">*</span></label>
                                                                    <Field name="fantasyName" className="form-input ltr:pl-2 rtl:pr-10" id="fantasyName" />
                                                                    <ErrorMessage name="fantasyName" component="div" className="text-danger text-sm mt-1" />
                                                                </div>

                                                                <div className="relative mb-4 max-w-xs">
                                                                    <label htmlFor="cnpj">CNPJ:</label>
                                                                    <FormikMaskInput
                                                                        name="cnpj"
                                                                        className="form-input ltr:pl-2 rtl:pr-10"
                                                                        id="cnpj"
                                                                        mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]} />
                                                                    <ErrorMessage name="cnpj" component="div" className="text-danger text-sm mt-1" />
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-12">
                                                                    <div className="relative mb-4">
                                                                        <label htmlFor="cellPhone">Celular (WhatsApp):</label>
                                                                        <Field name="cellPhone" className="form-input ltr:pl-2 rtl:pr-10" id="cellPhone" />
                                                                        <ErrorMessage name="cellPhone" component="div" className="text-danger text-sm mt-1" />
                                                                    </div>
                                                                    <div className="relative mb-4">
                                                                        <label htmlFor="phone">Telefone Responsável:</label>
                                                                        <Field name="phone" className="form-input ltr:pl-2 rtl:pr-10" id="phone" />
                                                                        <ErrorMessage name="phone" component="div" className="text-danger text-sm mt-1" />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-12">
                                                                    <div className="relative mb-4">
                                                                        <label htmlFor="instagram">Usuário Instagram:</label>
                                                                        <Field name="instagram" className="form-input ltr:pl-2 rtl:pr-10" id="instagram" />
                                                                        <ErrorMessage name="instagram" component="div" className="text-danger text-sm mt-1" />
                                                                    </div>
                                                                    <div className="relative mb-4">
                                                                        <label htmlFor="linkYoutube">Link Youtube:</label>
                                                                        <Field name="linkYoutube" className="form-input ltr:pl-2 rtl:pr-10" id="linkYoutube" />
                                                                        <ErrorMessage name="linkYoutube" component="div" className="text-danger text-sm mt-1" />
                                                                    </div>
                                                                </div>

                                                                <div className="relative mb-4 max-w-xs">
                                                                    <label htmlFor="info">E-mail para Contato:</label>
                                                                    <Field name="info" className="form-input ltr:pl-2 rtl:pr-10" id="info" />
                                                                    <ErrorMessage name="info" component="div" className="text-danger text-sm mt-1" />
                                                                </div>

                                                                <div className="relative mb-4">
                                                                    <label htmlFor="info">Sobre a Empresa:</label>
                                                                    <Field as="textarea" rows={6} name="about" className="form-input ltr:pl-2 rtl:pr-10" id="info" />
                                                                    <ErrorMessage name="about" component="div" className="text-danger text-sm mt-1" />
                                                                </div>

                                                                <div className="relative mb-4">
                                                                    <div className='grid grid-cols-2 gap-4'>
                                                                        <label className="inline-flex">
                                                                            <Field type="checkbox" name="pixUse" className="form-checkbox" />
                                                                            <span>Aceita Pix</span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                {values.pixUse && (
                                                                    <div className="grid grid-cols-3 gap-12">
                                                                        <div className="relative mb-4">
                                                                            <label htmlFor="instagram">Tipo de chave:</label>
                                                                            <FormikReactSelect
                                                                                id="pixType"
                                                                                placeholder="Selecione uma categoria"
                                                                                name="pixType"
                                                                                isMulti={false}
                                                                                options={[
                                                                                    { value: 'cpf', label: 'CPF' },
                                                                                    { value: 'cnpj', label: 'CNPJ' },
                                                                                    { value: 'email', label: 'E-mail' },
                                                                                    { value: 'telefone', label: 'Telefone' },
                                                                                    { value: 'random', label: 'Chave Aleatória' },
                                                                                ]}
                                                                            />
                                                                            <ErrorMessage name="pixType" component="div" className="text-danger text-sm mt-1" />
                                                                        </div>
                                                                        <div className="relative mb-4 col-span-2">
                                                                            <label htmlFor="pixKey">Chave Pix:</label>
                                                                            <Field name="pixKey" className="form-input ltr:pl-2 rtl:pr-10" id="pixKey" />
                                                                            <ErrorMessage name="pixKey" component="div" className="text-danger text-sm mt-1" />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <div className="relative mb-4">
                                                                    <label className="inline-flex">
                                                                        <Field type="checkbox" name="open" className="form-checkbox" />
                                                                        <span>Aberto</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        {({ selected }) => (
                                                            <div className={`${selected ? 'active' : ''} p-3`}>
                                                                <div className="relative mb-4">
                                                                    <label htmlFor="address">Nome da Empresa: <span className="text-danger text-xs">*</span></label>
                                                                    <Field name="address" className="form-input ltr:pl-2 rtl:pr-10" id="address" />
                                                                    <ErrorMessage name="address" component="div" className="text-danger text-sm mt-1" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                    <Tab.Panel></Tab.Panel>
                                                </Tab.Panels>
                                            </div>
                                        </Tab.Group>
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="button" className="btn btn-danger max-w-xs" onClick={() => push('/home/products')}>
                                            Voltar
                                        </button>
                                        <button type="submit" className="btn btn-primary max-w-sm">
                                            {isSubmitting ? (
                                                <>
                                                    <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
                                                    Salvando...
                                                </>
                                            ) : 'Salvar'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : <div>Loading</div>}
                </div>
            </div>
        </div>
    )
}
