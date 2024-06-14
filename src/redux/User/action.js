import { json } from "react-router-dom";
import { GET_USER } from "./actiontype";
import axios from 'axios';

function getuser(payload){
    return {
        type:GET_USER,
        payload:payload
    }
}

// export const Getuser = () => (dispatch)=>{
//     axios.get('https://pabbly-2.onrender.com/user')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//     localStorage.setItem("users",JSON.stringify(response.data));
//     dispatch(getuser(response.data));
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// }

export const Register = (data) => (dispatch)=>{
    axios.post('https://hydro-yriq.onrender.com/user/register', data)
      .then(function (response) {
        console.log(response.data);
        alert(response.data.msg);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export const Login = (data,navigate) => (dispatch)=>{
    axios.post('https://hydro-yriq.onrender.com/user/login', data)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        // alert(response.data.msg);
        console.log(response.data.user.name);
        navigate(`/${response.data.user.name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
}