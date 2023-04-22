import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import vehicleRouter from './routes/vehicle.js';
import employeeRouter from './routes/employee.js';

const app = express()
app.listen(8080, () => {
    console.log("connected to backend!")
})


app.use(express.json())
app.use(cors())
app.use('/api/vehicle', vehicleRouter)
app.use('/api/employee', employeeRouter)



