import { IDefaultResponse, ITripResponse } from '@/domain/interfaces'
import { useLazyGetTripsQuery } from '@/redux/services/tripsApi'
import { currencyFormatter } from '@/utils/currencyUtils'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import DispatcherListItem from '../DispatcherListItem'

interface IProps {
    clicked: (trip: ITripResponse) => void
}

export default function DispatcherList(
    {
        clicked
    }: IProps
) {

    const interval = useRef<any>()
    const [trigger, { data: trips, error, isLoading }] = useLazyGetTripsQuery()

    useEffect(() => {
        trigger({ type: 'SEARCHING' })

        interval.current = setInterval(() => {
            trigger({ type: 'SEARCHING' })
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
            <DispatcherListItem data={trips?.data} clicked={handleClick} />
        </>
    )
}
