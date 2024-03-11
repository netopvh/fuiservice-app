import { ITripResponse } from '@/domain/interfaces'
import { useDeleteTripMutation, useGetTripsQuery, useLazyGetTripsQuery } from '@/redux/services/tripsApi'
import { currencyFormatter } from '@/utils/currencyUtils'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react'

interface IProps {
    data: ITripResponse[] | undefined
    clicked: (trip: ITripResponse) => void
}

export default function DispatcherListItem(
    {
        data,
        clicked
    }: IProps
) {

    const [trigger, { error, isLoading }] = useDeleteTripMutation()
    const [triggerTrips] = useLazyGetTripsQuery()
    const alert = withReactContent(Swal);

    const handleCancel = (trip: ITripResponse) => {
        trigger(trip.id)
            .unwrap()
            .then(() => {
                triggerTrips({ type: 'SEARCHING' })
                alert.fire({
                    title: 'Viagem cancelada com sucesso!',
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: 'color-success'
                    }
                })
            }).catch((error) => {
                console.error('Erro ao cancelar viagem', error)
                alert.fire({
                    title: 'Erro ao cancelar viagem!',
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: 'color-danger'
                    }
                })
            })
    }

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
                        <span className="font-bold">{trip?.current_provider_id == 0 ? "Atribuição Manual" : "Atribuição Automática"}</span>
                    </div>
                    {trip?.status !== 'CANCELADO' && (
                        <div>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleCancel(trip)} disabled={isLoading}>Cancelar</button>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}
