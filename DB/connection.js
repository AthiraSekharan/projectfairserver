const mongoose =require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING).then(result=>{
    console.log("mongoDB atlas connected with  pfServer");
}).catch(err=>{
    console.log("Connection Failed!!!!");
    console.log(err);
})