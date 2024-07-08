const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')


const IncomeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true,
    },
    type:{
        type:String,
        default:"income",
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
        maxLength:20,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        maxLength:20,
        trim:true,
    },
},{Timestamp:true})

module.exports=mongoose.model("Income",IncomeSchema)