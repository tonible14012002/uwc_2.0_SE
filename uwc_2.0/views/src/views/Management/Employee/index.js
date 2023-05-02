import { useCallback, useEffect, useState, useReducer } from "react";
import EButton from "../../../components/EButton";
import AssetFilter from "../components/AssetFilter";
import AssetSearch from "../components/AssetSearch";
import AssetTable from "../components/AssetTable";
import { EmployeeDeleteModal } from "../components/AssetDeleteModal"
import EmployeeForm from "./components/EmployeeForm";
import Schedule from "../../Schedule";
import { getMyEmployee } from "../../../services/emlpoyeServices";
import employeeReducer from "../../../context/EmployeeContext/employeeReducer";
import { EmployeeContext } from "../../../context/EmployeeContext/employeeProvider";

const Employee = () => {

    const [ showDeleteModal, setShowDeleteModal ] = useState({show: false, id: null})
    const [ showFormModal, setShowFormModal ] = useState({show: false, id: null})
    const [ showScheduleModal, setShowScheduleModal ] = useState({show: false, id: null})

    const [employees, dispatcher] = useReducer(employeeReducer, undefined)

    const handleFetchEmployee = () => {
        const fetchEmployee = async () => {
            try {
                const result = await getMyEmployee()
                dispatcher({type: 'get', data: result.data})
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchEmployee()
    }

    useEffect(handleFetchEmployee, [])

    const handleAddEmployeePress = () => {
        setShowFormModal({show: true, id: null})
    }

    const handleUpdateEmployeePress = useCallback((id) => {
        setShowFormModal({show: true, id: id})
    }, [])

    const handleCloseEmployeeForm = useCallback(() => {
        setShowFormModal({show: false, id: null})
    }, [])

    const handleDeleteEmployeePress = useCallback((id) => {
        setShowDeleteModal({show: true, id: id, type: 'employee'})
    }, [setShowDeleteModal])

    const handleCloseDeleteModal = useCallback(() => {
        setShowDeleteModal({show: false, id: null})
    }, [setShowDeleteModal])

    const handleSchedulePress = useCallback((id) => {
        setShowScheduleModal({show: true, id: id})
        // navigate(`/schedule/${id}`);
    },[])
    const handleCloseSchedule = useCallback(() => {
        setShowScheduleModal({show: false, id: null})
    }, [])

    return (
        <EmployeeContext.Provider value={{employees, dispatcher}}>
            <div>
                <header className="mt-16 mb-8">
                    <span className="block w-fit text-4xl font-semibold ">
                        Employee Management
                </span>
                </header>

                <ul className="h-10 flex mb-8">
                    <EButton className="border-2 border-blue-400 text-blue-400 px-4 font-medium hover:bg-blue-400 hover:text-white active:opacity-60 transition-all"
                        onClick={handleAddEmployeePress}
                    >
                        + Employee
                    </EButton>

                    <span className="block flex-1" /* space */ />
                    <AssetSearch

                    />
                    <span className="w-10" /*space*/ />
                    <AssetFilter

                    />
                </ul>

                <AssetTable
                    assetType="employee"
                    columnNames={['Id', 'Full Name', 'Role', 'Contact', 'Email', 'Hired date']}
                    AssetKeys={['id', 'fullname', 'role', 'phone', 'email', 'hired_date']}
                    gridClassName="grid-cols-[100px_300px_2fr_2fr_3fr_2fr_1fr]"
                    onDeleteAsset={handleDeleteEmployeePress}
                    onUpdateAsset={handleUpdateEmployeePress}
                    onCalendarAsset={handleSchedulePress}
                    assets={employees || []}
                />
            </div>
            {showDeleteModal.show &&
            <EmployeeDeleteModal
                assetId={showDeleteModal.id}
                onClose={handleCloseDeleteModal}
            />}
            {showFormModal.show &&
            <EmployeeForm
                employeeId={showFormModal.id}
                onClose={handleCloseEmployeeForm}
            />}
            {showScheduleModal.show &&
            <Schedule
                id={showScheduleModal.id}
                onClose={handleCloseSchedule}
            />}
        </EmployeeContext.Provider>
    );
}


export default Employee;