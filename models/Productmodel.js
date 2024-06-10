const {sequelize}=require("../config/Dbconfig");
const {DataTypes}=require("sequelize");

const productSchema=sequelize.define("product",{
    name:{type:DataTypes.STRING,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.NUMBER,allowNull:false},
    category:{type:DataTypes.STRING,allowNull:false},
    creator:{type:DataTypes.STRING,allowNull:false},
    dates:{type:DataTypes.STRING,allowNull:false}
},{
    timestamps:false
});

module.exports={productSchema};