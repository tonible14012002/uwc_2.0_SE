
const EmployeeModel = () => {

    let autoId = 0
    const create = ({
        fullname, 
        role, 
        phone, 
        email, 
        vehicle=null, 
        route=null
    }) => {
        return {
            id: autoId++, 
            hired_date: new Date().toLocaleDateString(),
            fullname,
            role,
            phone,
            email,
            vehicle,
            route,
        }
    }

    return {
        create
    }
}

export default EmployeeModel()