import mysql from 'mysql'

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"SE_assignment"
})

export const vehicleController = {

    getAllVehicles: (req,res) =>{
        const q = "select * from vehicle";
        db.query(q, (err, data) => {
            if(err) res.status(500).json({ message: 'Error retrieving vehicles' });
            return res.status(200).json(data)
        })
    },

    getVehicleByID: (req, res) => {
        const {id} = req.params;
        const q = "select * from vehicle where id = ?"
        db.query(q, [id], (err,data) => {
            if(err) return res.status(500).json({message : 'Error Getting vehicle Id = ${id}'})
            return res.status(200).json(data)
        })
    },

    postVehicle: (req,res) => {
        const q = "insert into vehicle(`driver_name`, `type_of_vehicle`, `capacity`) values(?)"
        const values = [
            req.body.driver_name,
            req.body.type_of_vehicle,
            req.body.capacity
        ];
        db.query(q, [values], (err,data) => {
            if(err) return res.status(500).json({message : 'Error Posting vehicle'})
            return res.status(200).json('Vehicle is created successfully')
        })
    },

    deleteVehicle: (req,res) => {
        const {id} = req.params;
        console.log('Vehicle ID:', id);
        const q = "delete from vehicle where id = ?";

        db.query(q, [id], (err,data) => {
            if(err) {
                console.log(err)
                return res.status(500).json({message : 'Error Deleting vehicle'})
            }
            console.log(data)
            return res.status(200).json('Vehicle is deleted successfully')
        })
    },


    updateVehicle: (req,res) => {
        const {vehicleID} = req.params;
        const q = "INSERT INTO vehicle (id, driver_name, type_of_vehicle, capacity) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE driver_name = VALUES(driver_name), type_of_vehicle = VALUES(type_of_vehicle), capacity = VALUES(capacity)";
        const values = [vehicleID, req.body.driver_name, req.body.type_of_vehicle, req.body.capacity];

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json({message : 'Error Updating vehicle'})
            return res.status(200).json('Vehicle is updated successfully')
        });
    },
}



