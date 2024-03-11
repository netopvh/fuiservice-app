'use client'

import Panel from "@/components/Panel"
import { useLazyGetTripsQuery } from "@/redux/services/tripsApi"
import { useCallback, useEffect, useRef, useState } from "react"
import Maps from "@/components/Maps";
import DispatcherNavbar from "./_components/DispatcherNavbar"
import DispatcherRequest from "./_components/DispatcherRequest"
import { ITripResponse } from "@/domain/interfaces"
import DispatcherList from "./_components/DispatcherList"
import DispatcherCancelledList from "./_components/DispatcherCancelledList";


export default function Page() {

    const defaultCenter = { lat: 0, lng: 0 };

    const [map, setMap] = useState<google.maps.Map>()
    const [content, setContent] = useState<string>('dispatch-map')
    const [inTrip, setInTrip] = useState<boolean>(false)
    const [center, setCenter] = useState(defaultCenter);
    const [title, setTitle] = useState<string>('Viagens em Pesquisa')

    const interval = useRef<any>()
    const [trigger, { data: trips, error, isLoading }] = useLazyGetTripsQuery()

    const getCurrentLocation = useCallback(async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    // useEffect(() => {
    //     trigger({ type: search })

    //     interval.current = setInterval(() => {
    //         trigger({ type: search })
    //     }, 3000)
    //     return () => {
    //         clearInterval(interval.current)
    //     }
    // }, [search])

    useEffect(() => {
        getCurrentLocation()
    }, []);


    const handleUpdateBody = (body: string) => {
        setContent(body)
        if (body === 'dispatch-create') {
            setTitle('Nova Viagem')
        }
    }

    const handleUpdateFilter = (filter: string) => {
        if (filter === 'all') {
            setContent('dispatch-map')
            setTitle('Viagens em Pesquisa')
        } else if (filter === 'assigned') {
            setContent('dispatch-assigned')
            setTitle('Viagens em Andamento')
        } else if (filter === 'cancelled') {
            setContent('dispatch-cancelled')
            setTitle('Viagens Canceladas')
        } else if (filter === 'return') {
            setContent('dispatch-return')
            setTitle('Viagens em Pesquisa')
        } else {
            setContent('dispatch-map')
            setTitle('Viagens em Pesquisa')
        }
    }

    const initMap = (trip: ITripResponse) => {

        if (map) {
            var bounds = new google.maps.LatLngBounds();

            var originMarker = new google.maps.Marker({
                position: { lat: trip.s_latitude, lng: trip.s_longitude },
                map: map,
                title: 'Partida'
            });

            var destinationMarker = new google.maps.Marker({
                position: { lat: trip.d_latitude, lng: trip.d_longitude },
                map: map,
                title: 'Destino'
            });

            var source = new google.maps.LatLng(trip.s_latitude, trip.s_longitude);
            var destination = new google.maps.LatLng(trip.d_latitude, trip.d_longitude);

            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: true });

            directionsDisplay.setMap(map);

            directionsService.route({
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    originMarker.setPosition(response?.routes[0].legs[0].start_location);
                    destinationMarker.setPosition(response?.routes[0].legs[0].end_location);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });

            if (trip.provider) {
                var providerMarker = new google.maps.Marker({
                    map: map,
                    icon: "/images/marker-car.png",
                    anchorPoint: new google.maps.Point(0, -29)
                });

                var provider = new google.maps.LatLng(trip.provider.latitude, trip.provider.longitude);
                providerMarker.setPosition(provider);
                providerMarker.setVisible(true);
                bounds.extend(providerMarker.getPosition() as google.maps.LatLng)
            }

            bounds.extend(originMarker.getPosition() as google.maps.LatLng)
            bounds.extend(destinationMarker.getPosition() as google.maps.LatLng)
            map.fitBounds(bounds)
        }
    }

    const handleRequestShow = (trip: ITripResponse) => {
        if (trip.status === 'CANCELADO') {
            setContent('dispatch-cancelled')
        } else if (
            trip.status === 'CHEGOU' ||
            trip.status === 'PEGOU' ||
            trip.status === 'INICIADO'
        ) {
            location.assign(`/dashboard/dispatch/${trip.id}`)
        } else {
            if (trip.current_provider_id === 0) {
                setContent('dispatch-assign')
            } else {
                setContent('dispatch-map')

            }
        }

        initMap(trip)
    }

    const handleRequestCancel = (arg: any) => {
        setContent('dispatch-map')
    }

    return (
        <div className="container mx-auto px-2">
            <h4 className="font-bold text-lg">Painel Expeditor</h4>

            <DispatcherNavbar content={content} updateBody={handleUpdateBody} updateFilter={handleUpdateFilter} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <Panel
                        key={1}
                        title={title}
                    >
                        {content === 'dispatch-create' && (
                            <DispatcherRequest complete={handleRequestShow} cancel={handleRequestCancel} />
                        )}
                        {content === 'dispatch-map' && (
                            <DispatcherList clicked={handleRequestShow} />
                        )}
                        {content === 'dispatch-assigned' && (
                            <div>assigned</div>
                        )}
                        {content === 'dispatch-cancelled' && (
                            <DispatcherCancelledList clicked={handleRequestShow} />
                        )}
                        {content === 'dispatch-assign' && (
                            <div>asssign</div>
                        )}
                        {/* {isLoading && (
                            Array(3).fill(0).map((_, index) => (
                                <>
                                    <Skeleton key={index} count={5} />
                                </>
                            ))
                        )}
                        {error && <p>Erro ao carregar</p>} */}
                        {/* {trips?.data?.length === 0 && (
                            <div className="flex flex-col mt-4">
                                <div>
                                    <img src="/assets/images/no-data.svg" alt="Nenhuma viagem encontrada" className="w-10 mx-auto" />
                                </div>
                                <div className="mx-auto mt-4 text-lg font-bold">Nenhuma viagem encontrada</div>
                            </div>
                        )} */}
                        {/* {trips?.data?.map((trip, index) => (
                            <div key={index} className="flex justify-between items-center" onClick={() => handleTripClick(trip)}>
                                <div>
                                    <h6 className="text-sm font-bold mb-2">{trip?.user.full_name}</h6>
                                    <span className={`${trip?.badge}`}>{trip?.status}</span>
                                    <div className="mt-2"><span className="font-bold">Partida:</span> {trip?.s_address}</div>
                                    <div className="mt-2 mb-2"><span className="font-bold">Destino:</span> {trip?.d_address}</div>
                                    <div className="mb-2"><span className="font-bold">Valor Médio: </span>{currencyFormatter(trip?.estimated_fare)}</div>
                                    <span className="font-bold">{trip?.current_provider_id == 0 ? "Atribuição Manual" : "Atribuição Automática"}</span>
                                </div>
                                {trip?.status !== 'CANCELADO' && (
                                    <div>
                                        <button type="button" className="btn btn-danger btn-sm">Cancelar</button>
                                    </div>
                                )}
                            </div>
                        ))} */}
                    </Panel>
                </div>
                <div className="col-span-8">
                    <Panel
                        key={2}
                        title="Mapa"
                    >
                        <div className="w-full h-1/2">
                            <Maps setMap={setMap} location={center} />
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    )
}
