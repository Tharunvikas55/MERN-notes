
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const UserModel = require('./model/User')
const ExpenseModel=require('./model/Expense')

const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET",'POST','PUT','DELETE'],
    credentials:true
}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/accessrefreshtoken")
    .then(result=>console.log("Connected to mongodb"))
    .catch(err=>console.log(err))

//middleware to verify the user is authorized or not
const verifyUser= async (req,res,next)=>{
    const accesstoken=req.cookies.accessToken;
    if(!accesstoken){
        const tokenRefreshed = await renewToken(req, res);
        if (tokenRefreshed) {
            return next();
        } else {
            return res.json({ valid: false, message: "Invalid Token" });
        }
    }
    else{
        jwt.verify(accesstoken,"jwt-access-token-secret-key",(err,decoded)=>{
            if(err) {const tokenRefreshed =  renewToken(req, res);
                if (tokenRefreshed) {
                    return next();
                } else {
                    return res.json({ valid: false, message: "Invalid Token" });
                }}
            else{
                req.email=decoded.email;
                //req.user = user;
                return next();
            }
        });
    }
};

const renewToken=(req,res)=>{
    const Refreshtoken=req.cookies.RefreshToken;
    let exist=false;
    if(!Refreshtoken){
        res.clearCookie('accessToken');
        return false;
    }else{
        return jwt.verify(Refreshtoken,"jwt-refresh-token-secret-key",(err,decoded)=>{
            if(err) {
                res.clearCookie('accessToken');
                return false;
            }
            else{
                const newAccessToken=jwt.sign({email:decoded.email},"jwt-access-token-secret-key",{expiresIn:'5m'})
                res.cookie("accessToken",newAccessToken,{maxAge:300000})
                return true;
            }
        });
    }
};

app.post('/register',(req,res)=>{
    // const newuser=new UserModel(req.body);
    // newuser.save()
    const {name,mobile,email,password}=req.body;
    
    bcrypt.hash(password,10)
    .then(hash=>{
        UserModel.create({name,mobile,email,password:hash})
        .then((user)=>
        res.status(201).json(user))
        .catch(error=>
            res.status(500).json(error)
        )
    })
    .catch(error=>{
        console.log(error.message)}
    )
  })

app.post('/login',(req,res)=>{  
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const accessToken=jwt.sign({email:email},"jwt-access-token-secret-key",{expiresIn:'5m'})
                    const RefreshToken=jwt.sign({email:email},"jwt-refresh-token-secret-key",{expiresIn:'30m'})

                    const userId = user._id; 

                    res.cookie("accessToken",accessToken,{ maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
                    res.cookie("RefreshToken",RefreshToken,{ maxAge: 1800000, httpOnly: true, secure: true, sameSite: 'strict' })
                    return res.json({Login:true, user: {id:userId, name: user.name, email: user.email}})
                }
                else{
                    res.json({Login:false,message:"Password Incorrect"})
                }
            })
            
        }
        else{
            res.json({Login:false,message:"user account not found"})
        }
    })
});

app.get('/dashboard',verifyUser,(req,res)=>{
    // return res.json({valid:true,message:"authorized"})
    UserModel.findOne({ email: req.email })
    .then(user => {
        if (user) {
            return res.json({ valid: true, message: "Authorized", user: { name: user.name, email: user.email ,id:user._id} });
        } else {
            return res.json({ valid: false, message: "User not found" });
        }
    })
    .catch(err => {
        console.log("Error fetching user:", err);
        res.status(500).json({ valid: false, message: "Internal Server Error" });
    });
})


app.get('/:userId/get-expenses', async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
        const expenseDoc = await ExpenseModel.findOne({ userId });
        if (expenseDoc) {
            res.status(200).json({ expenses: expenseDoc.expenses });
        } else {
            res.status(404).json({ message: 'No expenses found for this user' });
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Add a new expense for a specific user
app.post('/:userId/add-expense', async (req, res) => {
    const { title, description, amount } = req.body;
    const expenseAmount = parseFloat(amount);
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const newExpense = {
            title,
            description,
            amount: expenseAmount,
            date: new Date()
        };

        let expenseDoc = await ExpenseModel.findOne({ userId });

        if (expenseDoc) {
            expenseDoc.expenses.push(newExpense);
            expenseDoc.totalExpense += expenseAmount;
        } else {
            expenseDoc = new ExpenseModel({
                userId,
                expenses: [newExpense],
                totalExpense: expenseAmount
            });
        }

        await expenseDoc.save();
        res.status(200).json({ message: 'Expense added successfully', expenses: expenseDoc.expenses });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/:userId/edit-expense/:expenseId', async (req, res) => {
  const { userId, expenseId } = req.params;
  const { title, description, amount, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ message: 'Invalid user ID or expense ID' });
  }

  try {
      const expense = await ExpenseModel.findOneAndUpdate(
          { userId, 'expenses._id': expenseId },
          {
              $set: {
                  'expenses.$.title': title,
                  'expenses.$.description': description,
                  'expenses.$.amount': parseFloat(amount),
                  'expenses.$.date': date,
              },
          },
          { new: true }
      );

      if (!expense) {
          return res.status(404).json({ error: 'Expense not found' });
      }

      res.json({ message: 'Expense edited successfully', expense });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});


  // Delete an expense
  app.delete('/:userId/delete-expense/:expenseId', async (req, res) => {
    const { userId, expenseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(expenseId)) {
        return res.status(400).json({ message: 'Invalid user ID or expense ID' });
    }

    try {
        const updatedUser = await ExpenseModel.updateOne(
            { userId },
            { $pull: { expenses: { _id: expenseId } } }
        );

        if (updatedUser.modifiedCount === 0) {
            return res.status(404).json({ message: 'Expense not found or already deleted' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all incomes for a user
app.get('/:userId/get-incomes', async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      const incomeDoc = await IncomeModel.findOne({ userId });
      if (incomeDoc) {
        res.status(200).json({ incomes: incomeDoc.income, totalIncome: incomeDoc.totalincome });
      } else {
        res.status(404).json({ message: 'No incomes found for this user' });
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Add new income
app.post('/:userId/add-income', async (req, res) => {
    const { userId } = req.params;
    const { title, description, amount } = req.body;
  
    if (!title || !description || !amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const income = new IncomeModel({
        title,
        description,
        amount,
        userId,
      });
  
      await income.save();
      user.incomes.push(income._id);
      await user.save();
  
      res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
  

// Update income
app.put('/:userId/update-income/:incomeId', async (req, res) => {
    const { userId, incomeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(incomeId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
  
    const { title, description, amount } = req.body;
    if (!title || !description || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const incomeDoc = await IncomeModel.findOne({ userId });
      if (incomeDoc) {
        const incomeIndex = incomeDoc.income.findIndex(income => income._id.toString() === incomeId);
        if (incomeIndex !== -1) {
          const oldAmount = incomeDoc.income[incomeIndex].amount;
          incomeDoc.income[incomeIndex] = { title, description, amount };
          incomeDoc.totalincome += amount - oldAmount;
          await incomeDoc.save();
          res.status(200).json({ message: 'Income updated successfully', income: incomeDoc.income });
        } else {
          res.status(404).json({ message: 'Income not found' });
        }
      } else {
        res.status(404).json({ message: 'No incomes found for this user' });
      }
    } catch (error) {
      console.error('Error updating income:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Delete income
app.delete('/:userId/delete-income/:incomeId', async (req, res) => {
    const { userId, incomeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(incomeId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
  
    try {
      const incomeDoc = await IncomeModel.findOne({ userId });
      if (incomeDoc) {
        const incomeIndex = incomeDoc.income.findIndex(income => income._id.toString() === incomeId);
        if (incomeIndex !== -1) {
          const [removedIncome] = incomeDoc.income.splice(incomeIndex, 1);
          incomeDoc.totalincome -= removedIncome.amount;
          await incomeDoc.save();
          res.status(200).json({ message: 'Income deleted successfully' });
        } else {
          res.status(404).json({ message: 'Income not found' });
        }
      } else {
        res.status(404).json({ message: 'No incomes found for this user' });
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ success: true, message: "Logged out successfully" });
});
  
app.listen(3001,()=>console.log("server is running in port http://localhost:3001"));