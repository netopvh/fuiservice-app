import { useLazyGetTripsQuery } from '@/redux/services/tripsApi'
import React, { useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import DispatcherCancelledListItem from '../DispatcherCancelledListItem'
import { ITripResponse } from '@/domain/interfaces'

interface IProps {
    clicked: (trip: ITripResponse) => void
}

export default function DispatcherCancelledList({
    clicked
}: IProps) {

    const interval = useRef<any>()
    const [trigger, { data: trips, error, isLoading }] = useLazyGetTripsQuery()

    useEffect(() => {
        trigger({ type: 'CANCELLED' })

        interval.current = setInterval(() => {
            trigger({ type: 'CANCELLED' })
        }, 4000)
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    const handleClick = (trip: ITripResponse) => {
        clicked(trip)
    }

    return (
        <>
            {isLoading && (
                Array(3).fill(0).map((_, index) => (
                    <>
                        <Skeleton key={index} count={5} />
                    </>
                ))
            )}
            {error && <p>Erro ao carregar</p>}
            <DispatcherCancelledListItem data={trips?.data} clicked={handleClick} />
        </>
    )
}
