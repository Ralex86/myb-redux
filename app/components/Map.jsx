import React, {Component} from 'react'
import {
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps'

import exampleMapStyles from '../styles/map_style.js'

const Map = withGoogleMap(props => {
    // https://snazzymaps.com/style/8097/wy
    // voir si on peut accorder map avec tendance
    // de MYB

    return(
            <GoogleMap
                defaultOptions={{ styles: exampleMapStyles.style }}
                defaultZoom={9}
                defaultCenter={
                    {
                        lat: parseFloat(props.latitude), 
                        lng: parseFloat(props.longitude)
                    }
                }
            >
                {props.markers && props.markers.map((marker,index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                    />
                ))}
            </GoogleMap>
    )
})

export default Map
