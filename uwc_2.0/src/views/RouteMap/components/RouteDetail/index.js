import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EButton from "../../../../components/EButton"
import { faChevronLeft, faClose, faPenToSquare, faPencilSquare } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useState } from "react"
import EmployeeSearchTab from "../../../../components/EmployeeSearchTab"
import { useEmployeeContext } from "../../../../context/EmployeeContext"

const MCPS = [
    {
        id:0,
        name: "MCP 0",
        location: {x: 50.2, y:100},
        location_name: "14 Pham ngu Lao",
        route:0,
    },
    {
        id:1,
        name: "MCP 1",
        location: {x: 50.2, y:200},
        location_name: "14 Hai Ba Trung",
        route:0,
    },
    {
        id:2,
        name: "MCP 2",
        location: {x: 250.2, y:100},
        location_name: "14 Pham ngu Lao",
        route:0,
    },
    {
        id:3,
        name: "MCP 3",
        location: {x: 350.2, y:500},
        location_name: "14 Pham ngu Lao",
        route:0,
    },
]

const data = {
    employee: null,
    employeeName: null
}

const RouteDetail = ({
    id,
    onClose
}) => {

    const [ clickPosition, setClickPosition ] = useState({x:0, y:0})
    const [ routeData, setRouteData ] = useState(data)
    const [ MCPs, setMCPs ] = useState([
        {
            id:0,
            name: "MCP 0",
            location: {x: 50.2, y:100},
            location_name: "14 Pham ngu Lao",
            route:id,
        },
        {
            id: 1,
            name: "MCP 1",
            location: {x: 50.2, y:200},
            location_name: "14 Hai Ba Trung",
            route:id,
        },
        {
            id: 2,
            name: "MCP 2",
            location: {x: 250.2, y:100},
            location_name: "14 Pham ngu Lao",
            route:id,
        },
        {
            id: 3,
            name: "MCP 3",
            location: {x: 350.2, y:500},
            location_name: "14 Pham ngu Lao",
            route:id,
        },
    ])
    const [ showEmployeeSelector, setShowEmployeeSelector ] = useState(false)

    const { dispatcher } = useEmployeeContext(0)

    const handleAssignEmployeePress = useCallback((e) => {
        setClickPosition({
            x: e.pageX,
            y: e.pageY
        })
        setShowEmployeeSelector(true)
    }, [])

    const handleCloseEmployeeSelector = useCallback(() => {
        setShowEmployeeSelector(false)
    }, [])

    const handleFilterEmployee = useCallback((employee) => {
        return employee.route === null && employee.role === "Collector"
    }, [])

    const handleEmployeeSelect = useCallback((employeeId, fullname) => {
        dispatcher({type: 'patch', data: {
            id: employeeId,
            data: {
                route: id
            }
        }})
        setRouteData({employee: employeeId, employeeName: fullname})

    }, [dispatcher, id])

    const handleUnAssignEmployee = useCallback(() => {
        const employeeId = routeData.employee
        dispatcher({type: 'patch', data: {
            id: employeeId,
            data: {route: null}
        }})
        setRouteData({employee: null, employeeName: null})
    }, [routeData, dispatcher])

    return (
        <>
            {showEmployeeSelector &&
            <EmployeeSearchTab
                clickPosition={clickPosition}
                onClose={handleCloseEmployeeSelector}
                onSelect={handleEmployeeSelect}
                filter={handleFilterEmployee}
            />}
            <section className="flex justify-between items-baseline py-2">
                <h3 className="text-xl font-medium">Route 3</h3>
                <EButton className="pl-4 hover:pr-2 transition-all text-blue-400"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </EButton>
            </section>

            <section className="mt-2">
                <h3 className="bg-slate-100 p-2 font-medium text-slate-700">Employee</h3>
                {routeData.employee !== null ? 
                <div className="bg-slate-50 p-2 py-4 flex justify-between">
                    <span>{routeData.employeeName}</span>
                    <EButton className="text-red-400 hover:pr-2 active:opacity-60 transition-all"
                        onClick={handleUnAssignEmployee}
                    >
                        <FontAwesomeIcon icon={faClose}/>
                    </EButton>
                </div> :
                <div className="bg-slate-50 p-2 py-4 flex justify-between">
                    <span className="text-slate-300">______________</span>
                    <EButton className="text-teal-500 hover:pr-2 active:opacity-60 transition-all"
                        onClick={handleAssignEmployeePress}
                    >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </EButton>
                </div>}
            </section>

            <section className="mt-2">
                <h3 className="p-2 bg-slate-100 text-slate-700 font-medium">MCPs</h3>
                <table className="flex flex-col bg-slate-50">
                    <section className="grid grid-cols-[100px_2fr_3fr] font-medium p-2">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Location</span>
                    </section>
                    {MCPs.map(mcp => (
                        <MCPRow
                            key={mcp.id}
                            data={mcp}
                        />
                    ))}
                </table>
            </section>
        </>
    )
}

const MCPRow = ({data}) => {

    return (
        <div className="grid grid-cols-[100px_2fr_3fr] even:bg-white p-2">
            <span>{data.id}</span>
            <span>{data.name}</span>
            <span>{data.location_name}</span>
        </div>
    )
}

export default RouteDetail