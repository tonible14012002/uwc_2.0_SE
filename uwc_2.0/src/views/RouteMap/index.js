import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHeaderBound } from "../../layouts/DefaultLayout";
import AppMap from "./components/AppMap";

const RouteMap = () => {

    const { headerBound } = useHeaderBound()
    
    console.log(headerBound.height)
    return (
        <div className="flex gap-2">
            <div className="flex-1">
                <header className="mt-16 mb-8">
                    <span className="block w-fit text-4xl font-semibold ">
                        Vehicle Management
                </span>
                </header>
            </div>
            <AppMap/>
        </div>
    );
}

export default RouteMap;