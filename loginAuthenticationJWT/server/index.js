const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const UserModel = require('./model/User')

const app=express()
    app.use(cors({
        origin:["http://localhost:5173"],
        methods:["GET",'POST','PUT','DELETE'],
        credentials:true
    }))
    app.use(express.json())
    app.use(cookieParser())

    mongoose.connect("mongodb://localhost:27017/jwttoken")
    .then(result=>console.log("Connected to mongodb"))
    .catch(err=>console.log(err))

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    //console.log(token);
    if(!token){
        return res.json("Token unavailable");
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err) return res.json("Wrong Token")
            next()
        })
    }
}

app.get('/',(req,res)=>{
    res.send('Running');
})

app.get('/home',verifyUser,(req,res)=>{
    return res.json("Success")
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                    res.cookie("token",token);
                    res.json("success")
                }
                else{
                    res.json("Password Incorrect")
                }
            })
        }
        else{
            res.json("No recors existed")
        }
    })
})

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

app.listen(3001,()=>console.log("server is running in port http://localhost:3001"));