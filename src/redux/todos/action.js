import { Alert } from "@chakra-ui/react";
import { SINGLE_TODO, TODO_FAILURE, TODO_REQUEST, TODO_SUCCESS } from "./actiontypes";
import axios from 'axios';
import { Navigate } from "react-router-dom";

function todorequest(){
    return{
        type:TODO_REQUEST
    }
};

function todofail(){
    return{
        type:TODO_FAILURE
    }
}

function todoyahoo(payload)
{
    return{
        type:TODO_SUCCESS,
        payload:payload
    }
}

function singles(payload)
{
    return {
        type:SINGLE_TODO,
        payload:payload
    }
}


export const GetTodod = (obj) => (dispatch)=>{
    let token=localStorage.getItem('token');
    let user=JSON.parse(localStorage.getItem("user"))
    console.log(token,obj);
    const config={
        headers:{
            authorization:token
        },
      
    }
    dispatch(todorequest());
    axios.get(`https://hydro-yriq.onrender.com/products/${user.id}?sortBy=dates&order=${obj.order}&category=${obj.category}&minprize=${obj.minprize}&maxprize=${obj.maxprize}`,config)
  .then(function (response) {
    // handle success
    console.log(response.data);
    dispatch(todoyahoo(response.data))
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    dispatch(todofail);
  })
}

export const Getsingle = (id) => (dispatch)=>{
    let token=localStorage.getItem('token');
    // console.log(token,obj);
    const config={
        headers:{
            authorization:token
        },
      
    }
    dispatch(todorequest);
    axios.get(`https://hydro-yriq.onrender.com/products/single/${id}`,config)
  .then(function (response) {
    // handle success
    console.log(response.data,1);
    dispatch(singles(response.data[0]));
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    dispatch(todofail);
  })
}


export const Posttodos = (data) =>(dispatch)=>{
    let token=localStorage.getItem('token');
    // let user=JSON.parse(localStorage.getItem("user"))
    console.log(token,data);
    const config={
        headers:{
            authorization:token
        }
    }

    axios.post(`https://hydro-yriq.onrender.com/products`,data,config)
    .then(function (response) {
      // handle success
      console.log(response.data);
    //  alert(response.data.msg);
     window.location.reload();
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      dispatch(todofail);
    })
  }

  export const Deletetodos = (id) =>(dispatch)=>{
    let token=localStorage.getItem('token');
    // let user=JSON.parse(localStorage.getItem("user"))
    console.log(token);
    const config={
        headers:{
            authorization:token
        }
    }

    axios.delete(`https://hydro-yriq.onrender.com/products/delete/${id}`,config)
    .then(function (response) {
      // handle success
      console.log(response.data);
    //  alert(response.data.msg);
     window.location.reload();
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      dispatch(todofail);
    })
  }

  export const Edittodo = (id,data,navigate) =>(dispatch)=>{
    let token=localStorage.getItem('token');
    // let user=JSON.parse(localStorage.getItem("user"))
    console.log(token,data);
    const config={
        headers:{
            authorization:token
        }
    }

    axios.patch(`https://hydro-yriq.onrender.com/products/update/${id}`,data,config)
    .then(function (response) {
      // handle success
      console.log(response.data);
    //  alert(response.data.msg);
    //  window.location.reload();
    navigate("/");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      dispatch(todofail);
    })
  }

