const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    age:{
        type:Number
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports=UserModel