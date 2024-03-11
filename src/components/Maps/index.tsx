import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

type MapProps = {
    location: any
    setMap: React.Dispatch<React.SetStateAction<any>>
}

function Maps({ location, setMap }: MapProps) {

    const mapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapsApiKey
    })

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        </GoogleMap>
    ) : <></>
}

export default React.memo(Maps);
