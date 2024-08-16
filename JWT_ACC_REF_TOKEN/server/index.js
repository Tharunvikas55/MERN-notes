
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const UserModel = require('./model/User')

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
const verifyUser=async (req,res,next)=>{
    const accesstoken=req.cookies.accessToken;
    //console.log(token);
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
                req.email=decoded.email
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

app.get('/',(req,res)=>{
    res.send('Running');
})

// app.get('/home',(req,res)=>{
//     return res.json("Success")
// })

app.get('/dashboard',verifyUser,(req,res)=>{
    // return res.json({valid:true,message:"authorized"})
    UserModel.findOne({ email: req.email })
    .then(user => {
        if (user) {
            return res.json({ valid: true, message: "Authorized", user: { name: user.name, email: user.email } });
        } else {
            return res.json({ valid: false, message: "User not found" });
        }
    })
    .catch(err => {
        console.log("Error fetching user:", err);
        res.status(500).json({ valid: false, message: "Internal Server Error" });
    });
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
                    res.cookie("accessToken",accessToken,{ maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
                    res.cookie("RefreshToken",RefreshToken,{ maxAge: 1800000, httpOnly: true, secure: true, sameSite: 'strict' })
                    return res.json({Login:true, user: { name: user.name, email: user.email}})
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

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ success: true, message: "Logged out successfully" });
});

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