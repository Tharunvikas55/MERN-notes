const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
      },
      expenses: [{
        title:{
            type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true
        },
        date:{
          type:Date,
          default: Date.now ,
        }
      }],
      totalexpense:{
        type: Number,
          required: true,
          default:0,
      },
      // created_at: {
      //   type: Date,
      //   default: Date.now
      // }
},{timestamps:true})

const ExpenseModel=mongoose.model('Expense',ExpenseSchema);

module.exports=ExpenseModel;