const DEPORT_LOCATION = {
    x:10.760358160960603,
    y: 106.65314603782194
}

const TREATMENT_LOCATION = {
    x: 10.77185650706964, 
    y: 106.67736370892935
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