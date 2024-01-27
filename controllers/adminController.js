const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const adminAvailable = await User.findOne({email});

    if(adminAvailable){
        res.status(400);
        throw new Error("Admin already registered");
    }

    // Hashed Pass
    const hashedPass = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
       username: username, email: email, password: hashedPass
    });
    if(admin){
        res.status(201).json({_id: admin.id, email: admin.email});   
    }
    else{
        res.status(400);
        throw new Error("Admin data not valid");
    }
    res.json({message: "Registered successfully"});
});

const loginAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const admin = await Admin.findOne({email});
    if(admin && (await bcrypt.compare(password, admin.password))){
        const accessToken = jwt.sign({
                admin: {
                    username: admin.username,
                    email: admin.email,
                    id: admin.id,
                },
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "365d"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid.");
    }
});

const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.admin);
});

module.exports = {registerAdmin, loginAdmin, currentAdmin};