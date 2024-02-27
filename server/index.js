const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamp : true
})

const userModel = mongoose.model('user',schemaData)

mongoose.connect('mongodb://127.0.0.1:27017/crud_ops')
.then(()=>console.log("connected to database"))
.catch(()=>console.log(err))



//read data from database
app.get("/", async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data});
    // success: true
})

//write data to database
app.post("/create",async(req,res)=>{
    const data = new userModel(req.body)
    await data.save()
    console.log(req.body)
    res.send({success: true, message: "data saved successfully", data : data})
})

//update api
app.put('/update', async(req,res)=>{
    const {_id,...rest} = req.body
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success : true, message : "updation successful", data : data})
})

//delete api
app.delete("/delete/id", async(req,res)=>{
    const id = req.params.id
    // const {id,...rest} = req.body
    // console.log(req.body)
    // console.log(id)
    // console.log(rest)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "deletion successful"})
})


// const PORT = process.env.PORT || 8000
// app.listen(PORT, ()=>console.log("server is running"))
app.listen(8000, ()=>console.log("server is running"))

