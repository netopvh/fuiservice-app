'use client'

import LoadingMask from '@/components/LoadingMask';
import { useGetDashboardQuery } from '@/redux/services/dashboardApi'
import React from 'react'


export default function Indicators() {

    const { data, isFetching } = useGetDashboardQuery();

    return (
        <>
            {isFetching ? <LoadingMask customHeight={150} /> : (
                <>
                    <div className="mb-3 text-lg font-bold w-full text-center">Pedidos do Dia</div>

                    <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-5">
                        <div className="panel bg-gradient-to-r from-orange-500 to-orange-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Aguardando</div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data?.waiting} </div>
                            </div>
                        </div>
                        <div className="panel bg-gradient-to-r from-yellow-500 to-yellow-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Em Andamento</div>

                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data?.processing}</div>
                            </div>
                        </div>
                        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">A Caminho</div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data?.inTransit}</div>
                            </div>
                        </div>
                        <div className="panel bg-gradient-to-r from-green-500 to-green-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Entregue</div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data?.delivered}</div>
                            </div>
                        </div>
                        <div className="panel bg-gradient-to-r from-red-500 to-red-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Cancelados</div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data?.canceled}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
