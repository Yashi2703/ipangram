import axios from "axios";
const config = require("../envirement/development").config;

//login api
export const loginAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${config.backEnd}/login`, payload);
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//registration
export const signUpAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(
        `${config.backEnd}/registration`,
        payload
      );
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//createDep
export const createdepAction = ({ payload }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.post(`${config.backEnd}/department`, payload);
      console.log(response,"=========")
      return resolve(response.data);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
};

//getAllUser
export const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/getUser`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};

//getAllDep
export const getAllDep = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/getDep`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};
 
//assignTask

export const assignTask = ({ payload })=>{
  return new Promise(async(resolve,reject)=>{
    try{
      let response =  await axios.post(`${config.backEnd}/assignDep`,payload);
      return resolve(response.data);
    }catch(err){
      return reject(err);
    }
  })
}

//queryOne

export const Queryone  = ()=>{
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/queryOne`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}


export const Querytwo  = ()=>{
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/queryTwo`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}
export const checkAssign = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${config.backEnd}/checkUser?userId=${id}`);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};
