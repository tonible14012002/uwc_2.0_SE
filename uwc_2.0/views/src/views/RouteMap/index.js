import AppMap from "./components/AppMap";
import EButton from "../../components/EButton";
import { useReducer, useState } from "react";
import RouteList from "./components/RouteList";
import MCPList from "./components/MCPList";
import MapContext from "./context/MapContext";
import markerReducer from "./reducers/markerReducer";
import { DEPORT_LOCATION } from "../../models/mcps";

const RouteMap = () => {

    const [ showRoute, setShowRoute ] = useState(false)

    const [ markers, markerDispatcher ] = useReducer(markerReducer, [])
    const [ circles, circleDispatcher ] = useReducer(markerReducer, [])
    const [ mapCenter, setMapCenter ] = useState([DEPORT_LOCATION.x, DEPORT_LOCATION.y])

    const hanldeShowRoutePress = () => {
        setShowRoute(true)
    }

    const handleShowMcpPress = () => {
        setShowRoute(false)
    }
   
    return (
        <MapContext.Provider
            value={{
                markers,
                markerDispatcher,
                circles,
                circleDispatcher,
                mapCenter,
                setMapCenter
            }}
        >
            <div className="flex gap-8 mt-16">
                <div className="flex-1">

                    <header className="mb-8">
                        <span className="block w-fit text-4xl font-semibold ">
                            Vehicle Management
                        </span>
                    </header>

                    <ul className="h-10 flex gap-4 mb-4">
                        <EButton className={`text-blue-400 px-4 font-medium ${showRoute && "bg-blue-400 text-white"} border-2 border-blue-400 active:opacity-60 transition-all`}
                            onClick={hanldeShowRoutePress}
                        >
                            Routes
                        </EButton>
                        <EButton className={`text-blue-400 px-4 font-medium ${!showRoute && "bg-blue-400 text-white"} border-2 border-blue-400 active:opacity-60 transition-all`}
                            onClick={handleShowMcpPress}
                        >
                            MCPs
                        </EButton>
                    </ul>

                    {showRoute ?
                    <RouteList/>:
                    <MCPList/>}

                </div>
                <AppMap/>
            </div>
        </MapContext.Provider>
    );
}

export default RouteMap;