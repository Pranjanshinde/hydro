import { Box, Input, Text,Button,Card, Heading} from "@chakra-ui/react";
import { Select,CardBody } from '@chakra-ui/react';
import { useState,useEffect } from "react";
import {CloseIcon} from "@chakra-ui/icons"
import { useDispatch } from "react-redux";
import { Posttodos } from "../redux/todos/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// const initdata=JSON.parse(localStorage.getItem("users"));

const mainuser=JSON.parse(localStorage.getItem("user"));


const inidate={
    name:"",
    price:"",
    image:0,
    category:"",
    dates:""
}



function Createother(){
const [user,setUser]=useState([]);
const navigate=useNavigate();
const [data,setData]=useState(inidate);
const [time,setTime]=useState(0);
const { isOpen, onOpen, onClose } = useDisclosure();
const dispatch=useDispatch();
const notify = () => toast.info("Todo created successfully",{
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

console.log(mainuser);

function changedata(e)
{
    if(e.target.name=="price")
        {
            setData({...data,[e.target.name]:+e.target.value});
        }else{
            setData({...data,[e.target.name]:e.target.value});
        }
    
}

function getuser(name){
    setUser([...user,name]);
}

function sendPost(data){
    data.dates=new Date();
    data.creator=mainuser.id;
console.log(data);
dispatch(Posttodos(data));

notify();
}

function Deleteuser(val){
let arr=[];

arr=user.filter((item)=>item!=val);
setUser(arr);
}

console.log(time);

 function delayfunction(time)
{
    setTimeout(()=>sendPost(data), +time*1000*60);
    onClose();
    navigate(`/${mainuser.name}`);
    // window.location.reload();
}


    return(
        <>
        <Box width={{ base: "280px", md: "900px" }} marginLeft={{ base: "70px", md: "500px" }} paddingTop={"35px"} borderRadius={"15px"} paddingBottom={"35px"} boxShadow={"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;"} marginTop={"20px"} >
            <Heading textAlign={"center"}>Fill Product data</Heading>
            <Box  width={"90%"} margin={"auto"} height={"400px"} padding={"20px"} alignItems={"center"} textAlign={"center"} borderRadius={"12px"} boxShadow={"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;"}>
            <Input variant='flushed' placeholder='Name' borderBottom={"1px solid blue"} name="name" onChange={changedata}/>
            <Input variant='flushed' placeholder='price' type="number" borderBottom={"1px solid blue"} name="price" onChange={changedata}/>
            <Input variant='flushed' placeholder='Image'  borderBottom={"1px solid blue"} name="image" onChange={changedata}/>
            <Select placeholder='Select Category' variant='flushed' borderBottom={"1px solid blue"} name="category" onChange={changedata}>
  <option value='watch'>Watch</option>
  <option value='clothes'>Clothes</option>
  <option value='shoes'>Shoes</option>
</Select>
<Box  display={"flex"} alignItems={"left"}>
</Box>
<Box display={{ base: "block", md: "flex" }} justifyContent={{ base: "center", md: "space-evenly" }} w={{ base: "90%", md: "50%" }} m="auto">
<Button bg="blue" color="white" m="auto" mt="20px" onClick={() => { sendPost(data) }}>
    Add Product
  </Button>
  <Button bg="blue" color="white" m="auto" mt="20px" onClick={onOpen}>
    Add Product Later
  </Button>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Enter Time in minutes</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
             <Input placeholder="Enter time in minute" type="number" onChange={(e)=>{setTime(e.target.value)}}/>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={()=>{delayfunction(time)}}>Post Later</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
</Box>
            </Box>
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
        </>
    )
}

export default Createother;