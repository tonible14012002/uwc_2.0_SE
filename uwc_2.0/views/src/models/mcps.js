const DEPORT_LOCATION = {
    x: 30,
    y: 30
}

const TREATMENT_LOCATION = {
    x: 100,
    y: 100
}

const McpModel = () => {
    let autoIncreaseId = 0
    const create = (data) => ({
        id: autoIncreaseId++,
        name: data.name,
        location: {
            x: data.location.x,
            y: data.location.y,
        },
        location_name: data.location_name,
        work_radius: data.work_radius || 0,
        contain: data.contain || null,
        employees: data.employee || [] // only janitor
    })
    return {create}
}

export default McpModel()

export {TREATMENT_LOCATION, DEPORT_LOCATION}