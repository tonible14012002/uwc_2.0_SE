
import McpModel from "../models/mcps"

const getMcps = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: [
                McpModel.create({
                    //id: 0
                    name: "MCP 0",
                    location: {
                        x: 50.2,
                        y: 70.0
                    },
                    work_radius: 600,
                    location_name: "102 Pham Ngu Lao",
                }),
                McpModel.create({
                    //id: 1
                    name: "MCP 1",
                    location: {
                        x: 70.2,
                        y: 80.0
                    },
                    work_radius: 600,
                    location_name: "10 Le Thanh Ton",
                }),
                McpModel.create({
                    //id: 2
                    name: "MCP 2",
                    location: {
                        x: 40.2,
                        y: 90.0
                    },
                    location_name: "102 Ta Quang Buu",
                    work_radius: 600,
                }),
                McpModel.create({
                    //id: 3
                    name: "MCP 3",
                    location: {
                        x: 90.2,
                        y: 120.0
                    },
                    location_name: "90 Bac Hai",
                    work_radius: 600,
                }),
                McpModel.create({
                    //id: 4
                    name: "MCP 4",
                    location: {
                        x: 70.2,
                        y: 80.0
                    },
                    location_name: "20 Le Thanh Ton",
                    work_radius: 600,
                }),
                McpModel.create({
                    //id: 5
                    name: "MCP 5",
                    location: {
                        x: 70.2,
                        y: 80.0
                    },
                    location_name: "87 Cao Thang",
                    work_radius: 600,
                }),
            ]})
        }, 1000);
    })
}

const addMcp = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: McpModel.create(data)
            })
        },1000);
    })
}

const updateMcp = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data})
        });
    })
}

const getRoutes = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: []})
        }, 1000);
    })
}

const addRoute = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: data})
        }, 1000);
    })
}

const updateRoute = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: data})
        }, 1000);
    })
}

const getContains = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: []})
        }, 1000);
    })
}

export {getContains, getMcps, getRoutes, updateMcp, addRoute, updateRoute, addMcp }