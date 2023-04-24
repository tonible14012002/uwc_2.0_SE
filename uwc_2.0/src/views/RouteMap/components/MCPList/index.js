import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EButton from "../../../../components/EButton"
import SearchBar from "../SearchBar"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect, useState } from "react"
import MCPDetail from "../McpDetail"
import { useMcpContext } from "../../../../context/McpContext/McpProvider"
import { useMapContext } from "../../context/MapContext"

const MCPList = () => {

    const [ showMCPDetail, setShowMCPDetail ] = useState({visible: false, id: null})
    const { mcps } = useMcpContext()
    const { markerDispatcher } = useMapContext()

    const handleShowMCPMarkers = () => {
        const mcpMarkers = mcps?.map(mcp => {
            return {
                position: [mcp.location.x, mcp.location.y], 
                popup: () => (
                    <>{mcp.name} <br/> {mcp.location_name}</>
                )
            }
        }) || []
        markerDispatcher({type: 'add', data: {data:mcpMarkers}})
    }

    const handleMCPPress = useCallback((id) => {
        setShowMCPDetail({visible: true, id: id})
    }, [])

    const handleCloseMCPDetail = useCallback(() => {
        setShowMCPDetail({visible: false, id: null})
    }, [])

    useEffect(handleShowMCPMarkers, [markerDispatcher, mcps])

    return (
        <div className="w-full flex">
            <div className="flex flex-col gap-4 min-w-full">
                <SearchBar className="w-full max-w-[400px] h-12" />
                <section className="h-[500px] pr-4 overflow-auto">
                    {mcps?.map(mcp => (
                        <McpItem
                            key={mcp.id}
                            data={mcp}
                            onSelect={handleMCPPress}
                        />
                    ))}
                </section>
            </div>

            <section className={`min-w-full transition-all bg-white ${showMCPDetail.visible ? "block -translate-x-full": "translate-x-0"}`}>
                {showMCPDetail.visible && 
                <MCPDetail
                    id={showMCPDetail.id}
                    onClose={handleCloseMCPDetail}
                />}
            </section>
        </div>
    )
}

export default MCPList


const McpItem = ({
    data,
    onSelect,
}) => {

    const { id, name, location_name } = data

    const handleButtonPress = () => {
        onSelect(id)
    }

    return (
        <div className="even:bg-slate-50">
            <EButton className="w-full grid grid-cols-[50px_1fr_1fr_50px] p-4"
                onClick={handleButtonPress}
            >
                <span className="text-start">{id}</span>
                <span className="text-start">{name}</span>
                <span className="text-start font-medium">{location_name}</span>
                <span className="text-sm text-slate-400 text-right">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </span>
            </EButton>
        </div>
    )
}