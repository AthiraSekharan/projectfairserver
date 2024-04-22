//Loads .env file contents into process .env by default
require('dotenv').config()
const express=require('express')
const cors =require('cors')
const router= require('./Routs/router')
//Creates an express Application
const pfServer=express()
require('./DB/connection')


//-Use cors in express server
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT =3000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`project Fair Server Started at PORT:${PORT}`);
})


//http://localhost:3000/
pfServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:green">Project fair server started and waiting for client request!!!</h1>`)
})

