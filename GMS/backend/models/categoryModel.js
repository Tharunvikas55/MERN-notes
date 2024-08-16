const mongooose=require('mongoose');

const CategorySchema=new mongooose.Schema({
    category:{
        type:String,
        required:true,
    },
},{timestamps:true});

const CategoryModel=mongooose.model('Category',CategorySchema)

module.exports=CategoryModel;