import { useEffect, useState } from "react"
import EButton from "../../../../components/EButton"
import Modal from "../../../../components/Modal"
import ModalCloseButton from "../../../../components/ModalCloseButton"
import { useEmployeeContext } from "../../../../context/EmployeeContext"
import useIsMounted from "../../../../hooks/useIsMounted"
import LoadingModal from "../../../../components/LoadingModal"
import { deleteMyEmployee } from "../../../../services/emlpoyeServices"
import { deleteMyVehicle } from "../../../../services/vehicleServices"
import { useVehicleContext } from "../../../../context/VehicleContext"

const AssetDeleteModal = ({assetId, waitTime = 3, assetType, onClose, ...props}) => {

    const [ count, setCount ] = useState(waitTime)
    const { dispatcher: employeeDispatcher } = useEmployeeContext()
    const { dispatcher: vehicleDispatcher } = useVehicleContext()
    const [ loading, setLoading ] = useState(false)
    const isMounted = useIsMounted()

    const handleDeleteAsset = async () => {
        if (assetType === "employee") {
            try {
                setLoading(true)
                await deleteMyEmployee(assetId)
                employeeDispatcher({type: "delete", data: {id: assetId}})
            }
            catch(e) {
                console.log(e)
            }
            onClose()
            if (isMounted()) {
                setLoading(false)
            }
        }
        else {
            try {
                setLoading(true)
                await deleteMyVehicle(assetId)
                vehicleDispatcher({type: 'delete', data: {id: assetId}})
            }
            catch (e) {
                console.log(e)
            }
            onClose()
            if (isMounted()) {
                setLoading(false)
            }
        }
    }

    const handleCountDown = () => {
        if (count === 0) return
        const timerId = setTimeout(() => {
            setCount(prev => prev - 1)
        }, 1000)
        return () => clearTimeout(timerId)
    }

    useEffect(handleCountDown, [count])

    return (
        <>
        {loading && <LoadingModal/>}
        <Modal>
            <div className="bg-white w-[450px] p-4 relative" {...props}>
                <ModalCloseButton
                    onClick={onClose}
                />
                <h3 className="font-medium text-2xl">Are your sure to delete this Employee</h3>
                {count > 0 &&
                <div className="m-auto rounded-full border-2 border-red-500 w-8 h-8 text-lg text-red-500 flex items-center justify-center mt-2">
                    <span>
                        {count}
                    </span>
                </div>}
                <ul className="flex p-2 "> 
                    <EButton className="flex-1 w-full hover:text-blue-500"
                        disabled={count !== 0}
                        onClick={handleDeleteAsset}
                    >
                        <span className="border-b-4 transition-all m-auto w-fit text-center hover:w-full border-b-blue-500">
                            Yes
                        </span>
                    </EButton>
                    <EButton className="flex-1 hover:text-red-500 "
                        onClick={onClose}
                    >
                        <span className="border-b-4 transition-all m-auto w-fit text-center hover:w-full border-b-red-500">
                            No
                        </span>
                    </EButton>
                </ul>
            </div>
        </Modal>
        </>
    )
}

export default AssetDeleteModal