
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EButton from "../../../../../../components/EButton"
import { faChevronLeft, faClose } from "@fortawesome/free-solid-svg-icons"
import { useMapContext } from "../../../../context/MapContext"
import { useCallback, useEffect, useState } from "react"
import { useMcpContext } from "../../../../../../context/McpContext/McpProvider"
import Marker from "../../../../mapAssets/Marker"
import L, { marker } from "leaflet"
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { Tooltip } from 'react-leaflet'




const RouteCreateForm = ({
    onClose,
    ...props
}) => {

    const { map, markers, markerDispatcher } = useMapContext()
    const [ chosenMcps, setChosenMcps ] = useState([])
    const { mcps } = useMcpContext()

    const onFinishForm = () => {
        return () => {
            markerDispatcher({type: 'reset'})
        }
    }

    const handleUnSelectMcp = useCallback((id) => {
        setChosenMcps(prev => {
            return prev.filter(m => m !== id)
        })
    }, [])

    const handleInitMapSelector = () => {
        const LeafIcon = L.Icon.extend({
                options: {}
        })
        const greenIcon = new LeafIcon({
            iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl: iconShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [50, 50]
        })

        const mcpMarkers = mcps?.map(mcp => {
            const markerIcon = chosenMcps.includes(mcp.id) ? {icon: greenIcon}:{}
            return Marker.create({
                ...markerIcon,
                position: [mcp.location.x, mcp.location.y],
                tooltip: mcp.name + '-' + mcp.location_name,
                eventHandlers: {
                    // ...iconProp,
                    click: () => {
                        setChosenMcps(prev => {
                            if (prev.includes(mcp.id)) {
                                return prev.filter(m=>m !== mcp.id)
                            }
                            else return [...prev, mcp.id]
                        })
                    }
                }
            })
        })

        if (mcpMarkers) {
            markerDispatcher({type: 'set', data: mcpMarkers})
        }
    }

    useEffect(handleInitMapSelector, [markerDispatcher, mcps, chosenMcps])
    useEffect(onFinishForm, [markerDispatcher])

    return (
        <div className="flex-1">
            <div className="flex justify-between mr-4">
                <EButton className="py-2 px-8 text-white bg-rose-400 min-w-[90px] group active:opacity-60 transition-opacity" 
                    onClick={onClose}
                >
                    <FontAwesomeIcon className="group-hover:-translate-x-2 transition-all" icon={faChevronLeft}/>
                </EButton>
                {chosenMcps.length > 1 && 
                <EButton className="py-2 px-2 bg-emerald-500 text-white font-medium">
                    Optimize Route
                </EButton>}
            </div>
            <h3 className="text-xl mt-4 text-emerald-500 ">Choose MCP on the Map</h3>
            <ul className="flex flex-col mt-4">
                {mcps.filter(m => chosenMcps.includes(m.id))
                .map(mcp => (
                    <ChosenMcpItem
                        key={mcp.id}
                        data={mcp}
                        onUnselect={handleUnSelectMcp}
                    />
                ))}
            </ul>
        </div>
    )
}

const ChosenMcpItem = ({data, onUnselect}) => {

    const handleUnSelect = () => {
        onUnselect(data.id)
    }

    return (
        <div className='bg-slate-50 h-14 font-medium text-slate-700 text-lg grid grid-cols-[100px_1fr_50px]'>
            <h3 className='text-slate-500 m-auto'>{data.name}</h3>
            <h3 className='my-auto ml-4'>{data.location_name}</h3>
            <EButton className="text-red-400 w-full h-full hover:rotate-12 transition-all "
                onClick={handleUnSelect}
            >
                <FontAwesomeIcon icon={faClose} />
            </EButton>
        </div>
    )
}

export default RouteCreateForm