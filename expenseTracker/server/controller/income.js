const IncomeSchema = require("../models/IncomeModels");

 exports.addIncome=async(req,res)=>{
   const {title,amount,date,category,description}=req.body;
   const income=IncomeSchema({
      title,amount,date,category,description
   })

   try{
      if(!title||!description||!amount||!category||!date)
         res.status(400).json({message:'All fields are required'})
      if(amount<=0 || !amount==='Number')
         res.status(400).json({message:'Amount should be valid'})
      await income.save();
      res.status(200).json({message:'Income Added successfully'})
   }catch(err)
   {
      console.log(err);
      res.status(500).json({message:"server error"})
   }
 }


 exports.getIncomes=async(req,res)=>{
   try{
      const incomes=await IncomeSchema.find().sort({createdAt:-1});
      res.status(200).json(incomes);
   }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"})
   }
 }

 exports.deleteIncome=async(req,res)=>{
   const {id}=req.params;
   IncomeSchema.findByIdAndDelete(id)
   .then((income)=>{
      res.status(200).json({message:'Income deleted'})
   })
   .catch(err=>{
      console.log(err);
      res.status(500).json({message:"server error"})
   })
 }