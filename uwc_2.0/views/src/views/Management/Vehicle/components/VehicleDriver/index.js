import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EButton from "../../../../../components/EButton"
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useVehicleContext } from "../../../../../context/VehicleContext"
import { useCallback, useState, useMemo } from "react"
import { useEmployeeContext } from "../../../../../context/EmployeeContext"
import EmployeeSearchTab from "../../../../../components/EmployeeSearchTab"
import { VehicleContext } from "../../../../../context/VehicleContext/vehicleProvider"

const VehicleDriver = ({ value, data}) => {
    const { id } = data
    const { vehicles, dispatcher } = useVehicleContext()
    const [ showEmployeeSelector, setShowEmployeeSelector ] = useState()
    const [ clickedPosition, setClickedPosition ] = useState({x: 0, y:0})

    const possibleDriver = useMemo(() => data.type === "Troller" ? "Janitor" : "Collector", [data])

    const handleUnAssignDriver = () => {
        try {
            // call un assign services....
            //
            dispatcher({type: 'patch', data: {id, data: {
                driver: null,
                driver_name: ""
            }}}) 
        }
        catch (e) {
            
        }
    }


    const handleFilterEmployeeSearch = useCallback((employee) => (
        employee.vehicle === null && employee.role === possibleDriver
    )
    , [possibleDriver])

    const handleAssignEmployeePress = (e) => {
        const mousePosition = {
            x: e.pageX,
            y: e.pageY
        }
        setClickedPosition(mousePosition)
        setShowEmployeeSelector(true)
    }

    const handleAssignEmployee = (employeeId, employeeName) => {
        // call assign employee service
        dispatcher({type: 'patch', data: {id, data: {
            driver: employeeId,
            driver_name: employeeName
        }}})
    }

    const handleCloseEmployeeSelector = useCallback(() => {
        setShowEmployeeSelector(false)
    }, [])

    return (
        <VehicleContext.Provider value={{vehicles, dispatcher}}>
            {showEmployeeSelector && 
            <EmployeeSearchTab
                onClose={handleCloseEmployeeSelector}
                clickPosition={clickedPosition}
                onSelect={handleAssignEmployee}
                filter={handleFilterEmployeeSearch}
            />}

            <div className="w-full h-full relative flex items-center">
                {value ?
                <div className="w-full text-start px-4 flex items-baseline justify-between">
                    <span>
                        {value}
                </span>
                <EButton className="text-red-400 shadow-sm mr-1"
                    onClick={handleUnAssignDriver}
                >
                        <FontAwesomeIcon icon={faClose}/>
                </EButton>
                </div>:
                // !value
                <div className="flex gap-3 px-4 items-baseline justify-between w-full">
                    
                    <span className="text-slate-300">_____________</span>
                    <EButton className="" 
                        onClick={handleAssignEmployeePress}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </EButton>
                </div>}
            </div>
        </VehicleContext.Provider>
    )
}

export default VehicleDriver