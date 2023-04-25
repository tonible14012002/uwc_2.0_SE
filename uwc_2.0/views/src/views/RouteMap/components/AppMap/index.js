import { MapContainer, Marker, Popup, Circle, TileLayer, useMap, Tooltip } from "react-leaflet"
import { useHeaderBound } from "../../../../layouts/DefaultLayout"
import { useMapContext } from "../../context/MapContext"
import { TREATMENT_LOCATION } from "../../../../models/mcps"
import { memo, useEffect, useState } from "react"
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const AppMap = () => {
    const { headerBound } = useHeaderBound()
    const { setMap, mapCenter, markers, circles, mapZoom } = useMapContext()

    const handleGetMapRef = (mapRef) => {
        setMap(mapRef)
    }
    
    console.log('__rerender MAPP')

    return (
        <div className="relative min-w-[1000px] py-2"
                style={{height: `calc(100vh - ${headerBound.height}px)`}}
            >
            
                <MapContainer className=" w-full h-full z-10"
                    whenReady={handleGetMapRef}
                    center={[TREATMENT_LOCATION.x, TREATMENT_LOCATION.y]}
                    zoom={15}
                    scrollWheelZoom={false}
                >
                    <MapController
                        center={mapCenter}
                        zoom={mapZoom}
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers?.map(mark => {
                        const {popup: CustomPopup, tooltip, ...restProps} = mark
                        return (
                            <Marker {...restProps}
                                key={mark.id}
                            >
                                {mark.popup && 
                                <Popup>
                                    <CustomPopup/>
                                </Popup>}
                                <div className="w-[40px] h-[40px] bg-red-500 absolute z-50 transform"/>
                                {tooltip && <Tooltip>
                                    {tooltip}
                                </Tooltip>}
                            </Marker>
                        )
                    })}
                    {circles?.map(circle => {
                        const {popup: CustomPopup, ...restProps} = circle
                        return (
                            <Circle {...restProps}
                                key={circle.id}
                            >
                                {circle.popup && 
                                <Popup>
                                    <CustomPopup/>
                                </Popup>}
                            </Circle>
                        )
                    })}
                </MapContainer>
        </div>
    )
}


const MapController = memo(({center, zoom}) => {
    const map = useMap()
    map.setView(center, zoom)
    return null
})

export default memo(AppMap)