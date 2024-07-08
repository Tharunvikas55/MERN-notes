//import dependencies
const express=require('express');
const cors=require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');

require('dotenv').config();

//port
const PORT=process.env.PORT

//express app
const app=express()

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))

const server=()=>{
    db()
    app.listen(PORT,()=>{
        console.log("Server is running in Port : ",PORT);
    })
}
server()