const {Router}=require("express");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel = require("../models/user.model");

const userRoutes=Router();

userRoutes.get("/",async(req,res)=>{
    const {name} = req.query;
    const user= await UserModel.findOne({name})
    if(user){
        res.status(200).send({"user":user})
    }else{
        res.send({"msg":"User Not Found!!"})
    }
})

userRoutes.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    bcrypt.hash(password,5,async(err,hash)=>{
        const user=new UserModel({name,email,password:hash})
        await user.save()
        res.status(200).send({"msg":"User Registered Successfully!!"})
    })
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"key")
                res.status(200).send({"msg":"Login Successfull!!", token, "user":user})
            }else{
                res.send({"msg":"Wrong Password!!"})
            }
        })
    }else{
        res.status(400).send({"msg":"User Not Found!!"})
    }
})

module.exports={userRoutes}