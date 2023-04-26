import { MinPriorityQueue } from '@datastructures-js/priority-queue';


export const OptimizerController = {
    Optimizer: (req, res) => {
        const inf = 10000;

        const distance = [
            [0, 950, 1200, 1600, 1700, 2400],
            [950, 0, 600, 850, 1300, 2200],
            [1200, 600, 0, 1400, 1800, 2700],
            [1600, 850, 1400, 0, 550, 1500],
            [1700, 1300, 1800, 550, 0, 850],
            [2400, 2200, 2700, 1500, 850, 0],
        ]

        const PointsInfo = []
        const MCPs = req.body.MCPs;

        const Parent = []
        const Data = [];
        let idx = 0;
        for (let point in MCPs) {
        {
            PointsInfo.push({ point: MCPs[point], minDist: inf, index: idx++, namePoint: point })
        }
        }
        const MCPsQueue = new MinPriorityQueue((point) => point.minDist);

        const minPath = (start, end) => {
            PointsInfo[start].adjIndex = 0;
            PointsInfo[start].minDist = 0;
            Parent[PointsInfo[start].index] = 0
            MCPsQueue.enqueue(PointsInfo[start]);

            while (!MCPsQueue.isEmpty()) {
                const curPoint = MCPsQueue.pop();
                if (curPoint.minDist > PointsInfo[curPoint.index].minDist) continue;
                PointsInfo.forEach((adjPoint) => {
                    const gap = distance[curPoint.index][adjPoint.index];

                    if (gap === 0) return;

                    if (adjPoint.minDist > curPoint.minDist + gap) {
                        adjPoint.minDist = curPoint.minDist + gap;
                        MCPsQueue.enqueue(adjPoint);
                        Parent[adjPoint.index] = curPoint.index;
                    }
                })
            }
            Data.push(PointsInfo[end].namePoint)
            while (end != start) {
                Data.push(PointsInfo[Parent[end]].namePoint);
                end = Parent[end];
            }
        }
        minPath(req.body.start, req.body.end);
        return res.status(200).json(Data);
    }
}


const distance = ({latitude: lat1, longitude: lon1}, {latitude: lat2, longitude: lon2}) => {
    const R = 6371; // Radius of the Earth in kilometers
    const disLat = toRadians(lat2 - lat1);
    const disLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(disLat / 2) * Math.sin(disLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(disLon / 2) *
        Math.sin(disLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const result = R * c;
    console.log(result)
    return result;
}

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

/*
{
    "MCPs":{
        "point0": {
            "longitude": 10.762357,
            "latitude": 106.662085,
            "isAvailable": true
        },
        "point1": {
            "longitude": 10.768384,
            "latitude": 106.658254,
            "isAvailable": true
        },
        "point2": {
            "longitude": 10.769650,
            "latitude": 106.670166,
            "isAvailable": true
        },
        "point3": {
            "longitude": 10.775690,
            "latitude": 106.667341,
            "isAvailable": true
        },
        "point4": {
            "longitude": 10.762120,
            "latitude": 106.668560,
            "isAvailable": true
        },
        "point5": {
            "longitude": 10.757372,
            "latitude": 106.663417,
            "isAvailable": true
        }
    },
    "start": 2,
    "end": 5
}
*/