const express=require('express');
const cors=require('cors')
const { connection } = require('./db');
const { userRoutes } = require('./routes/User.routes');
const { emiRoutes } = require('./routes/Emi.routes');
const app=express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes)
app.use('/emi',emiRoutes)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB!!")
    } catch (error) {
        console.log("Something went wrong!!");
    }
    console.log("Server is Running on 8080!!");
})