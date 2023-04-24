import { MapContainer, Marker, Popup, Circle, TileLayer } from "react-leaflet"
import { useHeaderBound } from "../../../../layouts/DefaultLayout"
import EButton from "../../../../components/EButton"
import { useMapContext } from "../../context/MapContext"

const AppMap = () => {
    const { headerBound } = useHeaderBound()
    const { mapCenter, markers, circles } = useMapContext()
    console.log('mapcenter', mapCenter)

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
                <MapContainer className=" w-full h-full z-10" center={mapCenter} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map(mark => {
                        return (
                            <Marker {...mark}>
                                {mark.popup && (() => {
                                    const CustomPopup = mark.popup
                                    return (
                                        <Popup>
                                            <CustomPopup/>
                                        </Popup>
                                    )
                                })}
                            </Marker>
                        )
                    })}
                    {circles.map(circle => {
                        const CustomPopup = circle.popup
                        return (
                            <Circle {...circle}>
                                {circles.popup && 
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

export default AppMap