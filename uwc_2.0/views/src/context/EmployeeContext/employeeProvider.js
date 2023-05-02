import { createContext, useContext, useEffect, useReducer } from "react";
import employeeReducer from "./employeeReducer";
import { getMyEmployee } from "../../services/emlpoyeServices";

const EmployeeContext = createContext()

const useEmployeeContext = () => useContext(EmployeeContext)

export { useEmployeeContext, EmployeeContext }