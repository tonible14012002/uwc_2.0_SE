

const RouteModel = () => {
    let autoIncreaseId = 0
    const create = (data) => ({
        id: autoIncreaseId++,
        name: data.name,
        contains: data.contains || [],
        employee: data.employee || null // only collector
    })
    return {create}
}

export default RouteModel()