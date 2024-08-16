const mongoose=require('mongoose')

const IncomeSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
      },
      income: [{
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
      totalincome:{
        type: Number,
          required: true,
          default:0,
      },
      // created_at: {
      //   type: Date,
      //   default: Date.now
      // }
},{timestamps:true})

const IncomeModel=mongoose.model('Income',IncomeSchema);

module.exports=IncomeModel;