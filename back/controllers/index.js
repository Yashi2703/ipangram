const userModel = require("../models/userModel");
const addDepModel = require("../models/addDepModel");
const assignDeptoUser = require("../models/assignDeptoUser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const nodemon = require("nodemon");
const { contentType } = require("express/lib/response");
const res = require("express/lib/response");
//registration
const registration = async (req, res) => {
  try {
    let data = req.body;
    if (!req.body) {
      throw { message: "Missing body parameters." };
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    data.userType = "user";
    let response = await userModel.create(data);
    if (!response) {
      throw { message: "Something went wrong during Registration" };
    }
    let jwtdata = {
      email: response.email,
      _id: response._id,
    };
    let generateToken = jwt.sign(jwtdata, process.env.JWT_KEY);
    let Jwtres = await userModel.findByIdAndUpdate(
      { _id: response._id },
      { token: generateToken },
      { new: true }
    );
    delete response.password;
    return res.json({
      status: true,
      statusCode: 200,
      message: "Registration successfull",
      isRegistration: true,
      response: Jwtres,
    });
  } catch (err) {
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};

//login

const login = async (req, res) => {
  try {
    if (!req.body) {
      throw { message: "required body parameters missing" };
    }
    let data = req.body;
    if (!data.email) {
      throw { message: "required body parameters: email" };
    }
    let response = await userModel.findOne({ email: data.email }).lean();
    if (!response) {
      throw { message: "Wrong Credentials" };
    }
    let comparePassword = await bcrypt.compare(
      data.password,
      response.password
    );
    if (!comparePassword) {
      throw { message: "Wrong Credentials" };
    }

    delete response.password;
    return res.json({
      status: true,
      statuscode: 200,
      data: response,
      message: "User Login Successfully",
    });
  } catch (err) {
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};

const department = async (req, res) => {
  try {
    let data = req.body;
    if (!data) {
      throw { message: "missing body parameters" };
    }
    let response = await addDepModel.create(data);
    console.log(response);
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
    });
  }
};

//assign Departmnet To User

const assignDep = async (req, res) => {
  try {
    let data = req.body;
    console.log(data,"dataatat")
    if (!req.body) {
      throw { message: "Missing required paramater." };
    }
    if (!data.userId) {
      throw { message: "Missing required paramater.:userId" };
    }
    if (!data.depId) {
      throw { message: "Missing required paramater.:DepId" };
    }
    data.userId = mongoose.Types.ObjectId(data.userId);
    data.depId = mongoose.Types.ObjectId(data.depId);
    const response = await assignDeptoUser.create(data);
    console.log(response);
    return res.json({
      data: response,
      status: true,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};
//get Department

const getDep = async (req, res) => {
  try {
    let data = req.query;
    if (!data) {
      throw { message: "missing body parameters " };
    }
    let response = await addDepModel.find();
    console.log(response);
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};
//getUser

const getUser = async (req, res) => {
  try {
    let data = req.query;
    if (!data) {
      throw { message: "missing body parameters" };
    }
    let response = await userModel.find({ userType: "user" });
    console.log(response);
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
};

const queryOne = async(req,res)=>{
  try{
    let data =  req.query
    if(!req.query){
      throw{message:"Missing body Parameters"}
    }
    let response =  await addDepModel.find({categoryName:"It",location: { $regex: 'a', $options: 'i'}},)
    console.log(response)
    return res.json({
      data:response,
      status:true,
      statusCode:200
    })
  }catch(err){
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
}
const queryTwo =  async(req,res)=>{
  try{
      let data =  req.query
      if(!req.query){
        throw{message:"Missing body Parameters"}
      }
      let response =  await addDepModel.find({categoryName:"sales"})
      console.log(response)
      return res.json({
        data:response,
        status:true,
        statusCode:200
      })
  }catch(err){
    console.log(err)
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      error: err,
    });
  }
}
const checkUserAssigndep = async (req, res) => {
  try {
    let data = req.query;
    console.log(data)
    if (!data) {
      throw { message: "missing body parameters " };
    }
    let response = await assignDeptoUser.find({ userId: data.userId }).populate("depId","categoryName departmentName location" );
    console.log(response)
    return res.json({
      status: true,
      statusCode: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    let message = err && err.message ? err.message : "Something went wrong";
    return res.json({
      status: false,
      statusCode: 400,
      message: message,
      Error: err,
    });
  }
};
module.exports = {
  registration,
  login,
  department,
  assignDep,
  getDep,
  getUser,
  queryOne,
  queryTwo,
  checkUserAssigndep
};
