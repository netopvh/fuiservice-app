'use client'

import React, { useState } from 'react'
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useGetUserInfoQuery } from '@/redux/services/userApi';

export default function Page() {

    const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);

    const { data: user } = useGetUserInfoQuery();

    return (
        <div className="panel" id="simple">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Informações do Perfil</h5>
                <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => console.log('cliced')}>
                    <span className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                            <path
                                d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path opacity="0.5" d="M13.9868 5L10.0132 19.8297" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path
                                d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        Code
                    </span>
                </button>
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
                            <div className="active pt-5">
                                <div className="font-bold">
                                    {user?.fantasyName}
                                </div>
                            </div>
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
