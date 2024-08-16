const mongoose=require("mongoose");
const schema=mongoose.Schema;

const vehicleSchema=new schema({
    registrationNumber:{
        type:String,
        required:true,
    },
    busNumber:{
        type:String,
        required:true,
    },
    currentKm:{
        type:Number,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    engineNumber:{
        type:String,
        required:true,
    },
    fuelType:{
        type:String,
        required:true,
    },
    registrationDate:{
        type:String,
        required:true,
    },
    fitnessValidupto:{
        type:String,
        required:true,
    },
    taxValidupto:{
        type:String,
        required:true,
    },
    lastServiceDate:{
        type:String,
        required:true,
    },
    lastServiceKilometer:{
        type:Number,
        required:true,
    },
    nextServiceKilometer:{
        type:Number,
        required:true,
    }

},{timestamps:true})

const vehicleModel=mongoose.model("vehicle",vehicleSchema);

module.exports=vehicleModel;