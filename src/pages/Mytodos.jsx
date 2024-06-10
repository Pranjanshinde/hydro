import { Card,CardBody,Image,Stack,Heading,Text,Divider,CardFooter,Button,ButtonGroup, Box,Progress, Input  } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Deletetodos, Edittodo, GetTodod } from "../redux/todos/action";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mytodos(){
const navigate=useNavigate();
const dispatch=useDispatch();
const isloading=useSelector((state)=>{
  return state.todoreducer.isloading
});
const [sortby,setSortby]=useState("dates");
const [order,setOrder]=useState("ASC");
const [cat,setCat]=useState("");
const [minprize,setMinprize]=useState(0);
const [maxprize,setMaxprize]=useState(10000);
const [toggle,setToggle]=useState(false);
const notify = () => toast.info("Deletion Successfull",{
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

const notify1 = () => toast.info("Updation Successfull",{
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

console.log(order,cat,minprize,maxprize);

let  user=JSON.parse(localStorage.getItem("user"));


function setorders(e)
{
  setOrder(e.target.value);
}

function settypes(e)
{
  setCat(e.target.value);
}



function Updatestatus(id,data)
{
 
  dispatch(Edittodo(id,data))
  notify1();


}

const mytodos=useSelector((state)=>{
  console.log(state.todoreducer.todos);
  return state.todoreducer.todos
}) || [];

useEffect(()=>{
  const obj={
    sortby:sortby,
    order:order,
    category:cat,
    minprize:minprize,
    maxprize:maxprize
  }
  dispatch(GetTodod(obj));
},[order,cat,toggle]);


function deletedodos(id){
dispatch(Deletetodos(id));
notify();
}

console.log(mytodos,1);



    return(
       isloading ? <Box  marginLeft={{ base: "50px", md: "400px" }} w={"1100px"}><Stack>
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
       <Skeleton height='20px' />
     </Stack></Box> :
       <>
        <Box   margin={"auto"} marginLeft={{ base: "50px", md: "375px" }} width={"70%"}>
          <Box  display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}><Text fontSize={"30px"} paddingLeft={"20px"}>Products</Text>
          <Select placeholder='Select category' w={"250px"} onChange={settypes}>
          <option value=''>All category</option>
          <option value='watch'>Watch</option>
  <option value='clothes'>Clothes</option>
  <option value='shoes'>Shoes</option>
</Select>
<Select placeholder='sort according to date' w={"250px"} onChange={setorders}>
          <option value='DESC'>High to Low</option>
  <option value='ASC'>Low to High</option>
</Select>
          </Box>
          <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} marginTop={"10px"}>
            <Input placeholder="Minvalue" w={"200px"} value={minprize} onChange={(e)=>{setMinprize(e.target.value)}} />
            <Input placeholder="Maxvalue" w={"200px"} value={maxprize}  onChange={(e)=>{setMaxprize(e.target.value)}}/>
            <Button bg={"#002244"} color={"white"} onClick={()=>{setToggle(!toggle)}} >Set</Button>
          </Box>
        
        <Box display={"grid"} gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }} gap={"20px"} paddingLeft={"20px"} paddingTop={"25px"}>
        {
          mytodos.length!=0 &&  mytodos.map((item)=>{
                return(
                    <Box >
                    <Card boxShadow={" rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;"} >
  <CardBody>
    <Image
      src={item.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      width={"150px"}
      height={"150px"}
   margin={"auto"}
    />
     <Stack mt='6' spacing='3'>
      <Heading size='md'>{item.name}</Heading>
      <Text fontSize={'2xl'}>
        {item.category} category
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        ${item.price}
      </Text>
      <Text  fontSize='2xl'>
        created at : {item.dates}
      </Text>            
    </Stack>
  </CardBody>
  <Divider w={"90%"} margin={"auto"} />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={()=>{navigate(`/edit/${item.id}`)}} >
        Edit
      </Button>
      <Button variant='ghost' colorScheme='blue'  onClick={()=>{deletedodos(item.id)}}>
        Delete
      </Button>
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
    </ButtonGroup>
  </CardFooter>
</Card>
                    </Box>
                )
            })
        }
        </Box>
        </Box>
        </>
      
    )
}

export default Mytodos;