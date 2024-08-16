const ExpenseSchema = require("../models/ExpenseModel");

 exports.addExpense=async(req,res)=>{
   const {title,amount,date,category,description}=req.body;
   const expense=ExpenseSchema({
      title,amount,date,category,description
   })

   try{
      if(!title||!description||!amount||!category||!date)
         res.status(400).json({message:'All fields are required'})
      if(amount<=0 || !amount==='Number')
         res.status(400).json({message:'Amount should be valid'})
      await expense.save();
      res.status(200).json({message:'Expense Added successfully'})
   }catch(err)
   {
      console.log(err);
      res.status(500).json({message:"server error"})
   }
 }


 exports.getExpense=async(req,res)=>{
   try{
      const expenses=await ExpenseSchema.find().sort({createdAt:-1});
      res.status(200).json(expenses);
   }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"})
   }
 }

 exports.deleteExpense=async(req,res)=>{
   const {id}=req.params;
   ExpenseSchema.findByIdAndDelete(id)
   .then((expense)=>{
      res.status(200).json({message:'Expense deleted'})
   })
   .catch(err=>{
      console.log(err);
      res.status(500).json({message:"server error"})
   })
 }