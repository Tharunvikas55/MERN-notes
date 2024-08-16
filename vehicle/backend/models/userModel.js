const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
    },
    licenceNumber:{
        type:String,
    },
    licenceExpiry:{
        type:Number,
    },
    joined:{
        type:Number,
    },
    status:{
        type:String,
    },

})

const UserModel=mongoose.model('user',userSchema);

module.exports=UserModel;