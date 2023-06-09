import { useReducer, useState, useCallback, useEffect } from "react";
import AssetTable from "../components/AssetTable";
import AssetSearch from "../components/AssetSearch";
import AssetFilter from "../components/AssetFilter";
import EButton from "../../../components/EButton";
import VehicleForm from "./components/VehicleForm";
import VehicleLoad from "./components/VehicleLoad";
import VehicleDriver from "./components/VehicleDriver";
import { VehicleDeleteModal } from "../components/AssetDeleteModal";
import vehicleReducer from "../../../context/VehicleContext/vehicleReducer";
import { getMyVehicle } from "../../../services/vehicleServices";
import { VehicleContext } from "../../../context/VehicleContext/vehicleProvider";

const Vehicle = () => {

    const [ showDeleteModal, setShowDeleteModal ] = useState({show: false, id: null})
    const [ showFormModal, setShowFormModal ] = useState({show: false, id: null})
    const [ vehicles, dispatcher ] = useReducer(vehicleReducer, undefined)

    const handleFetchVehicles = () => {
        if (vehicles) return 

        const fetchEmployee = async () => {
            try {
                const result = await getMyVehicle()
                console.log(result)
                dispatcher({type: 'get', data: result.data})
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchEmployee()
    }

    useEffect(handleFetchVehicles, [vehicles])

    const handleAddVechiclePress = () => {
        setShowFormModal({show: true, id: null})
    }

    const handleUpdateVehiclePress = useCallback((id) => {
        setShowFormModal({show: true, id: id})
    }, [])

    const handleCloseVehicleForm = useCallback(() => {
        setShowFormModal({show: false, id: null})
    }, [])

    const handleDeleteVechiclePress = useCallback((id) => {
        setShowDeleteModal({show: true, id: id, type: 'employee'})
    }, [setShowDeleteModal])

    const handleCloseDeleteModal = useCallback(() => {
        setShowDeleteModal({show: false, id: null})
    }, [setShowDeleteModal])

    return (
        <VehicleContext.Provider value={{vehicles, dispatcher}}>
            <div>
                <header className="mt-16 mb-8">
                        <span className="block w-fit text-4xl font-semibold ">
                            Vehicle Management
                    </span>
                </header>

                <ul className="h-10 flex mb-8">
                    <EButton className="border-2 border-blue-400 text-blue-400 px-4 font-medium hover:bg-blue-400 hover:text-white active:opacity-60 transition-all"
                        onClick={handleAddVechiclePress}
                    >
                        + Vehicle
                    </EButton>

                    <span className="block flex-1" /* space */ />
                    <AssetSearch

                    />
                    <span className="w-10" /*space*/ />
                    <AssetFilter
                        options={['Active', 'Inactive', 'Truck', 'Troller']}
                    />
                </ul>

                <AssetTable
                    assetType="vehicle"
                    columnNames={['Id', 'Driver', 'Type', 'Capacity', 'Load']}
                    AssetKeys={['id', 'driver_name', 'type', 'capacity', 'load']}
                    gridClassName="grid-cols-[120px_300px_2fr_2fr_3fr_100px]"
                    onDeleteAsset={handleDeleteVechiclePress}
                    onUpdateAsset={handleUpdateVehiclePress}
                    assets={vehicles || []}
                    //custom Rendering
                    load={VehicleLoad}
                    driver_name={VehicleDriver}
                />
            </div>
            {showDeleteModal.show &&
            <VehicleDeleteModal
                assetId={showDeleteModal.id}
                onClose={handleCloseDeleteModal}
            />}
            {showFormModal.show &&
            <VehicleForm
                vehicleId={showFormModal.id}
                onClose={handleCloseVehicleForm}
            />}
        </VehicleContext.Provider>
    );
}

export default Vehicle;
