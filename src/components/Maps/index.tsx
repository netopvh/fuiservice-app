import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

type MapProps = {
    location: google.maps.LatLngBounds
}

function Maps({ location }: MapProps) {

    const mapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    const [center, setCenter] = React.useState({ lat: 0, lng: 0 })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapsApiKey
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {

        const bounds = new window.google.maps.LatLngBounds(location);
        map.fitBounds(bounds);
        setCenter(bounds.getCenter().toJSON())
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Maps);
