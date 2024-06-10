import { Box, Input, Text,Button,Card, Heading} from "@chakra-ui/react";
import { Select,CardBody } from '@chakra-ui/react';
import { useState,useEffect } from "react";
import {CloseIcon} from "@chakra-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edittodo, Getsingle } from "../redux/todos/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initdata=JSON.parse(localStorage.getItem("users"));

const mainuser=JSON.parse(localStorage.getItem("user"));


const inidate={
    name:"",
    price:"",
    image:0,
    category:"",
    date:""
    
}

function Edittodos(){
const navigate=useNavigate();



const singles=useSelector((state)=>{
    return state.todoreducer.singletodo
});

const notify = () => toast.info("Todo Edited successfully",{
    position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: "Bounce",
});

const [data,setData]=useState(singles ||inidate);
console.log(singles);

    const [user,setUser]=useState(singles?.liable || []);
    const dispatch=useDispatch();
    const {id}=useParams();

    console.log(id);

    useEffect(()=>{
        dispatch(Getsingle(id));
        
    },[]);

    function getuser(name){
        setUser([...user,name]);
    }

    function changedata(e)
{
    if(e.target.name=="price")
        {
            setData({...data,[e.target.name]:+e.target.value});
        }else{
            setData({...data,[e.target.name]:e.target.value});
        }
}


function sendedits(){
    data.creator=mainuser.id;
    console.log(data);
dispatch(Edittodo(id,data,navigate));
notify();
// console.log(data);
}
    
    function Deleteuser(val){
    let arr=[];
    
    arr=user.filter((item)=>item!=val);
    setUser(arr);
    }


    
    
        return(
            <>
            <Box width={{ base: "280px", md: "900px" }} marginLeft={{ base: "70px", md: "500px" }} paddingTop={"35px"} borderRadius={"15px"} paddingBottom={"35px"} boxShadow={"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;"} marginTop={"20px"}>
                <Heading textAlign={"center"}>Edit Product data</Heading>
                <Box  width={"90%"} margin={"auto"} height={"400px"} padding={"20px"} alignItems={"center"} textAlign={"center"} borderRadius={"12px"} boxShadow={"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;"}>
                <Input variant='flushed' placeholder='Name' borderBottom={"1px solid blue"} name="name" onChange={changedata} value={data?.name}/>
                <Input variant='flushed' placeholder='price' type="number" borderBottom={"1px solid blue"} name="price" onChange={changedata} value={data?.price}/>
                <Input variant='flushed' placeholder='Image'  borderBottom={"1px solid blue"} name="image" onChange={changedata} value={data?.image}/>
                <Select placeholder='Select Category' variant='flushed' borderBottom={"1px solid blue"} name="category" onChange={changedata} value={data?.category}>
  <option value='watch'>Watch</option>
  <option value='clothes'>Clothes</option>
  <option value='shoes'>Shoes</option>
</Select>
   
    <Button bg={"blue"} color={"white"} margin={"auto"} marginTop={"20px"} onClick={sendedits}>Edit Product</Button>
    <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={"Bounce"}
            color="white"
            background-color="#002244"
            />
                </Box>
            </Box>
            </>
        )
}

export default Edittodos;