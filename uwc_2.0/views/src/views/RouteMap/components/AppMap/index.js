import { MapContainer, Marker, Popup, Circle, TileLayer, useMap } from "react-leaflet"
import { useHeaderBound } from "../../../../layouts/DefaultLayout"
import EButton from "../../../../components/EButton"
import { useMapContext } from "../../context/MapContext"
import { TREATMENT_LOCATION } from "../../../../models/mcps"
import { memo } from "react"

const AppMap = () => {
    const { headerBound } = useHeaderBound()
    const { mapCenter, markers, circles, mapZoom } = useMapContext()
    return (
        <div className="relative min-w-[1000px] py-2"
                style={{height: `calc(100vh - ${headerBound.height}px)`}}
            >
            <EButton className="absolute right-10 top-4 z-30 bg-white shadow-lg px-4 py-2 font-medium text-lg">
                Route 1
            </EButton>
            <EButton className="absolute right-10 top-16 z-30 bg-blue-400 text-white shadow-lg px-4 py-2 font-medium text-lg">
                Route 1
            </EButton>
                <MapContainer className=" w-full h-full z-10"
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
                    {markers.map(mark => {
                        const CustomPopup = mark.popup
                        return (
                            <Marker {...mark}>
                                {mark.popup && 
                                <Popup>
                                    <CustomPopup/>
                                </Popup>}
                                
                            <div className="w-[40px] h-[40px] bg-red-500 absolute z-50 transform"/>
                            </Marker>
                        )
                    })}
                    {circles.map(circle => {
                        const CustomPopup = circle.popup
                        return (
                            <Circle {...circle}>
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


const MapController = ({center, zoom}) => {
    const map = useMap()
    map.setView(center, zoom)
    return null
}

export default memo(AppMap)