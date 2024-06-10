const express=require("express");
const { coonection } = require("./config/Dbconfig");
const { userRouter } = require("./Routes/UserRoute");
const cors=require("cors");
const { prodrouter } = require("./Routes/Productroute");
const { Auth } = require("./middleware/Auth");
const app=express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
});

app.use("/user",userRouter);

app.use(Auth);

app.use("/products",prodrouter);

// console.log(process.env.DB_DATABASE);

app.listen(8080,async()=>{
    try {
        console.log("App is running at 8080");
        await coonection();
        console.log("connected")
    } catch (error) {
        res.send({"msg":error.message})
    }
    
})