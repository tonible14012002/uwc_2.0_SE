import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useHeaderBound } from "../../../../layouts/DefaultLayout"
import EButton from "../../../../components/EButton"

const AppMap = () => {
    const { headerBound } = useHeaderBound()
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
                <MapContainer className=" w-full h-full z-10" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
        </div>
    )
}

export default AppMap