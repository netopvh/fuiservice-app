'use client'

import Panel from "@/components/Panel"
import { useLazyGetTripsQuery } from "@/redux/services/tripsApi"
import { useEffect, useRef, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import Maps from "@/components/Maps";
import { currencyFormatter } from "@/utils/currencyUtils";

export default function Page() {


    const [content, setContent] = useState<string>('dispatch-map')
    const [selected, setSelected] = useState<string>('all')
    const [search, setSearch] = useState<string>('SEARCHING')

    const interval = useRef<any>()
    const [trigger, { data: trips, error, isLoading }] = useLazyGetTripsQuery()

    useEffect(() => {
        trigger({ type: search })

        interval.current = setInterval(() => {
            trigger({ type: search })
        }, 3000)
        return () => {
            clearInterval(interval.current)
        }
    }, [search])


    const handleBodyChange = (body: string) => {
        setContent(body)
    }

    const filter = (status: string) => {
        setSelected(status)
        if (status === 'all') {
            setSearch('SEARCHING')
        } else if (status === 'assigned') {
            setSearch('ASSIGNED')
        } else if (status === 'cancelled') {
            setSearch('CANCELLED')
        }
    }

    const isActive = (status: string) => {
        return (status === selected ? 'btn btn-primary' : 'btn btn-outline-primary')
    }

    const handleTripClick = (trip: any) => {
        console.log('trip', trip)
    }

    return (
        <div className="container mx-auto px-2">
            <h4 className="font-bold text-lg">Painel Expeditor</h4>
            <nav className="flex justify-between bg-[#e2dfdf] px-2 py-2 rounded border-a mb-2 mt-4">
                <div className="md:flex" id="process-filters">
                    <ul className="grid grid-cols-3 gap-4">
                        <button type="button" className={isActive('all')} onClick={() => filter('all')}>
                            Pesquisando
                        </button>
                        <button type="button" className={isActive('assigned')} onClick={() => filter('assigned')}>
                            Em andamento
                        </button>
                        <button type="button" className={isActive('cancelled')} onClick={() => filter('cancelled')}>
                            Canceladas
                        </button>
                    </ul>
                </div>
                <div>
                    <ul className="flex justify-end items-center">
                        <li className="nav-item">
                            <button type="button"
                                onClick={() => handleBodyChange('dispatch-map')}
                                className="btn btn-success btn-md label-right border-a-0 waves-effect waves-light">
                                <span className="btn-label"><i className="ti-plus"></i></span>
                                NOVA VIAGEM
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <Panel
                        title="Viagens em Pesquisa"
                    >
                        {isLoading && (
                            Array(3).fill(0).map((_, index) => (
                                <>
                                    <Skeleton count={5} /><br />
                                </>
                            ))
                        )}
                        {error && <p>Erro ao carregar</p>}
                        {trips?.data?.length === 0 && (
                            <div className="flex flex-col mt-4">
                                <div>
                                    <img src="/assets/images/no-data.svg" alt="Nenhuma viagem encontrada" className="w-10 mx-auto" />
                                </div>
                                <div className="mx-auto mt-4 text-lg font-bold">Nenhuma viagem encontrada</div>
                            </div>
                        )}
                        {trips?.data?.map((trip, index) => (
                            <div key={index} className="flex justify-between items-center" onClick={() => handleTripClick(trip)}>
                                <div>
                                    <h6 className="text-sm font-bold mb-2">{trip?.user.full_name}</h6>
                                    <span className={`${trip?.badge}`}>{trip?.status}</span>
                                    <div className="mt-2"><span className="font-bold">Partida:</span> {trip?.s_address}</div>
                                    <div className="mt-2 mb-2"><span className="font-bold">Destino:</span> {trip?.d_address}</div>
                                    <div className="mb-2"><span className="font-bold">Valor Médio: </span>{currencyFormatter(trip?.estimated_fare)}</div>
                                    <span className="font-bold">{trip?.current_provider_id == 0 ? "Atribuição Manual" : "Atribuição Automática"}</span>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-danger btn-sm">Cancelar</button>
                                </div>
                            </div>
                        ))}
                    </Panel>
                </div>
                <div className="col-span-8">
                    <Panel
                        title="Mapa"
                    >
                        <div className="w-full h-1/2">
                            <Maps />
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    )
}
