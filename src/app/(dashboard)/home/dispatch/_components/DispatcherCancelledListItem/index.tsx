import { ITripResponse } from '@/domain/interfaces'
import { currencyFormatter } from '@/utils/currencyUtils'
import React from 'react'

interface iProps {
    data: ITripResponse[] | undefined
    clicked: (trip: ITripResponse) => void
}

export default function DispatcherCancelledListItem(
    { data, clicked }: iProps
) {
    return (
        <>
            {data?.length === 0 && (
                <div className="flex flex-col mt-4">
                    <div>
                        <img src="/assets/images/no-data.svg" alt="Nenhuma viagem encontrada" className="w-10 mx-auto" />
                    </div>
                    <div className="mx-auto mt-4 text-lg font-bold">Nenhuma viagem encontrada</div>
                </div>
            )}
            {data?.map((trip, index) => (
                <div key={index} className="flex justify-between items-center cursor-pointer">
                    <div onClick={() => clicked(trip)}>
                        <h6 className="text-sm font-bold mb-2">{trip?.user.full_name}</h6>
                        <span className={`${trip?.badge}`}>{trip?.status}</span>
                        <div className="mt-2"><span className="font-bold">Partida:</span> {trip?.s_address}</div>
                        <div className="mt-2 mb-2"><span className="font-bold">Destino:</span> {trip?.d_address}</div>
                        <div className="mb-2"><span className="font-bold">Valor Médio: </span>{currencyFormatter(trip?.estimated_fare)}</div>
                        <div className="mb-2 font-bold">Motivo do Cancelamento:</div>
                        <div>{trip?.cancel_reason ? trip?.cancel_reason : 'Não Informado'}</div>
                        <div className="mt-2 mb-2"><span className="font-bold">Data:</span> {trip?.updated_at}</div>
                    </div>
                </div>
            ))}
        </>
    )
}
