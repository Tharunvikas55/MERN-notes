const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/login_register")
    .then(result => console.log("Connected to mongodb"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Running');
});

app.post('/register', async (req, res) => {
    const { name, mobile, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await UserModel.create({ name, mobile, email, password: hash });

        // Send the response
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const accessToken = jwt.sign({ email: email }, "jwt-access-token-secret-key", { expiresIn: '5m' });
                        const RefreshToken = jwt.sign({ email: email }, "jwt-refresh-token-secret-key", { expiresIn: '30m' });
                        res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });
                        res.cookie("RefreshToken", RefreshToken, { maxAge: 1800000, httpOnly: true, secure: true, sameSite: 'strict' });
                        return res.json({ Login: true, user: { name: user.name, email: user.email } });
                    } else {
                        res.json({ Login: false, message: "Password Incorrect" });
                    }
                });

            } else {
                res.json({ Login: false, message: "User account not found" });
            }
        });
});

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('RefreshToken');
    return res.json({ success: true, message: "Logged out successfully" });
});

app.listen(3001, () => console.log("Server is running in port http://localhost:3001"));
