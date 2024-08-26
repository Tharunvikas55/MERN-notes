const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const app=express()
const dotenv = require("dotenv");

dotenv.config();
// app.use(cors({
//   origin: ['https://mernclienttharun.vercel.app', 'https://mernbackendtharun.vercel.app']
// }));
app.use(cors())
// app.use(cors({
//   origin: 'https://mernclienttharun.vercel.app'  
// }));
// app.use(cors({
//   origin: 'https://mernclienttharun.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(express.json())  //this is to when we pass data from frontend to backend it will parse to json format

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.post("/createUser", (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json(err));
});

app.get("/",(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;
  UserModel.findByIdAndDelete(userId)
    .then(result => {
      if (result) {
        res.json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

  
app.listen(3001,()=>{
    console.log("Server is running in port http://localhost:3001");
})