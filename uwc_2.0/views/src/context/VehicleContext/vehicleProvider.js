import { createContext, useContext, useEffect, useReducer } from "react";
import vehicleReducer from "./vehicleReducer";
import { getMyVehicle } from "../../services/vehicleServices";


const VehicleContext = createContext()

const useVehicleContext = () => useContext(VehicleContext)

export { useVehicleContext, VehicleContext }