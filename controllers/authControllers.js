const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

//User SignUp...
exports.register = async (req,res)=>{
    try{
        //generating hashed password..
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //generating new user..
        const newUser = await new userModel({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        //save and respond...
        await newUser.save();
        res.status(200).json(newUser);
    }
    catch(error){
        res.status(500).json({
            status:"Fail",
            message:"Unable to register",
            error:error
        })
    }
}

//user Login..
exports.login = async (req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        !user && res.status(404).json({
            status:"fail",
            message:"Email not registered!",
        })

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        !isValidPassword && res.status(400).json({
            status:"fail",
            message:"Invalid Password!",
        })

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            status:"fail",
            message:"Unable to Login",
            error:error
        })
    }
}