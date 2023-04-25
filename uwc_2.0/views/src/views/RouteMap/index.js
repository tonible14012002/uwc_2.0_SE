import AppMap from "./components/AppMap";
import EButton from "../../components/EButton";
import { useEffect, useReducer, useState } from "react";
import RouteList from "./components/RouteList";
import MCPList from "./components/MCPList";
import MapContext from "./context/MapContext";
import markerReducer from "./reducers/markerReducer";
import { DEPORT_LOCATION, TREATMENT_LOCATION } from "../../models/mcps";
import { useMcpContext } from "../../context/McpContext/McpProvider";
import Marker from "./mapAssets/Marker";
import circleReducer from "./reducers/circleReducer";

const DEFAULT_MAP_ZOOM = 15

const RouteMap = () => {

    const [ showRoute, setShowRoute ] = useState(false)

    const [ markers, markerDispatcher ] = useReducer(markerReducer, [])
    const [ circles, circleDispatcher ] = useReducer(circleReducer, [])
    const [ mapCenter, setMapCenter ] = useState([TREATMENT_LOCATION.x, TREATMENT_LOCATION.y])
    const [ mapZoom, setMapZoom ] = useState(DEFAULT_MAP_ZOOM)
    const { mcps } = useMcpContext()

    const handleShowMCPMarkers = () => {
        if (markers.length) return 
        const mcpMarkers = mcps?.map(mcp => {
            return Marker.create({
                position: [mcp.location.x, mcp.location.y], 
                popup: () => (
                    <>{mcp.name} <hr/> {mcp.location_name}</>
                )
            })
        }) || []
        markerDispatcher({type: 'add', data: {data:mcpMarkers}})
    }

    const hanldeShowRoutePress = () => {
        setShowRoute(true)
    }

    const handleShowMcpPress = () => {
        setShowRoute(false)
    }

    useEffect(handleShowMCPMarkers, [mcps])
   
    return (
        <MapContext.Provider
            value={{
                markers,
                markerDispatcher,
                circles,
                circleDispatcher,
                mapCenter,
                setMapCenter,
                mapZoom, 
                setMapZoom
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

export { DEFAULT_MAP_ZOOM }
export default RouteMap;
