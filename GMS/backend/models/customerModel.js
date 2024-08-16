const mongooose=require('mongoose');

const CustomerSchema=new mongooose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    balance:{
        type:Number,
    },
    mobile:{
        type:String,
        required:true,
    },
},{timestamps:true});

const CustomerModel=mongooose.model('Customer',CustomerSchema)

module.exports=CustomerModel;