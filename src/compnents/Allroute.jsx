import { Route, Routes } from "react-router-dom";
import Mytodos from "../pages/Mytodos";
import Otherstodos from "../pages/Othertodo";
import Createother from "../pages/Createforother";
import Edittodos from "../pages/Edittodos";
import LoginPage from "../pages/Loginpage";
import PrivateRoute from "./Privateroute";


function Allroutes(){
    let  mainuser=JSON.parse(localStorage.getItem("user")) || {name:"anonymous"} ;
    let user=mainuser.name;
    console.log(user,1);
    const path1=`/${user}`;
    const path2=`/${user}/othertodo`;
    const path3=`/${user}/createother`;
    const path4=`/${user}/edit/:id`;


    return (
        <Routes>
            <Route path={path1} element={<PrivateRoute><Mytodos/></PrivateRoute>}/>
            <Route path={path2} element={<PrivateRoute><Otherstodos/></PrivateRoute>} />
            <Route path={path3} element={<PrivateRoute><Createother/></PrivateRoute>} />
            <Route path= {path4} element={<PrivateRoute><Edittodos/></PrivateRoute>} />
            <Route path="/login" element={<LoginPage/>} />

        </Routes>
    )
}

export default Allroutes;