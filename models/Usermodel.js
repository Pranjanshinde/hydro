const {sequelize}=require("../config/Dbconfig");
const {DataTypes}=require("sequelize");

const userSchema=sequelize.define("produser",{
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false}
},{
    timestamps:false
});

module.exports={userSchema};