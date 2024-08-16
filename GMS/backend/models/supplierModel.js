const mongooose=require('mongoose');

const SupplierSchema=new mongooose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    
},{timestamps:true});

const SupplierModel=mongooose.model('Supplier',SupplierSchema)

module.exports=SupplierModel;