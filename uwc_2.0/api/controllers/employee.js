import mysql from 'mysql'

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"SE_assignment"
})

export const employeeController = {

    getAllEmployees: (req,res) =>{
        const q = "select * from employee";
        db.query(q, (err, data) => {
            if(err) res.status(500).json({ message: 'Error retrieving employee' });
            return res.status(200).json(data)
        })
    },

    getEmployeeByID: (req, res) => {
        const {id} = req.params;
        const q = "select * from employee where id = ?"
        db.query(q, [id], (err,data) => {
            if(err) return res.status(500).json({message : 'Error Getting employee Id = ${id}'})
            return res.status(200).json(data)
        })
    },

    postEmployee: (req,res) => {
        const q = "insert into employee(`name`, `role`, `email`, `phoneNumber`,`hired_date`) values(?)"
        const values = [
            req.body.name,
            req.body.role,
            req.body.email,
            req.body.phoneNumber,
            req.body.hired_date
        ];
        db.query(q, [values], (err,data) => {
            if(err) return res.status(500).json({message : 'Error Posting employee'})
            return res.status(200).json('Vehicle is created successfully')
        })
    },

    deleteEmployee: (req,res) => {
        const {id} = req.params;
        console.log('Employee ID:', id);
        const q = "delete from employee where id = ?";

        db.query(q, [id], (err,data) => {
            if(err) {
                console.log(err)
                return res.status(500).json({message : 'Error Deleting employee'})
            }
            console.log(data)
            return res.status(200).json('Employee is deleted successfully')
        })
    },


    updateEmployee: (req,res) => {
        const {id} = req.params;
        const q = "insert into employee(`id`,`name`, `role`, `email`, `phoneNumber`,`hired_date`) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), email = VALUES(email), phoneNumber = values(phoneNumber), hired_date = values(hired_date)";
        const values = [id, req.body.driver_name, req.body.type_of_vehicle, req.body.capacity];

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json({message : 'Error Updating employee'})
            return res.status(200).json('Employee is updated successfully')
        });
    },
}



