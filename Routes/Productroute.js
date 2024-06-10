const express=require("express");
const {productSchema}=require("../models/Productmodel");
const { Op } = require('sequelize');
const prodrouter=express.Router();

prodrouter.post("/",async(req,res)=>{
    try {
        console.log(req.body)
        const product=await productSchema.create(req.body);
        res.send({"msg":"new product added","product":product});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

prodrouter.get("/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id}=req.params;
        const {order,category,minprize,maxprize}=req.query;
        console.log(order,category);
        var products;
        if(category=="")
            {
                 products=await productSchema.findAll({where:{creator:id,price:{
                    [Op.gt]:parseFloat(minprize),
                    [Op.lt]:parseFloat(maxprize)
                 }},
                    order: [["dates", order]]
                  });
            }else
            {
                products=await productSchema.findAll({where:{creator:id,price:{
                    [Op.gt]:parseFloat(minprize),
                    [Op.lt]:parseFloat(maxprize)
                 }},
                    order: [["dates", order]],where:{category:category}
                  });
            }
       
        res.send(products);
    } catch (error) {
        res.send({"msg":error.message});
    }
});

prodrouter.get("/single/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id}=req.params;
        const products=await productSchema.findAll({where:{id:id}});
        res.send(products);
    } catch (error) {
        res.send({"msg":error.message});
    }
});

prodrouter.patch("/update/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id}=req.params;
        const products=await productSchema.update(req.body,{where:{id:id}});
        res.send({"msg":"product updated successfully","product":products});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

prodrouter.delete("/delete/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id}=req.params;
        const products=await productSchema.destroy({where:{id:id}});
        res.send({"msg":"product deleted successfully","product":products});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

prodrouter.delete('/last', async (req, res) => {
    try {
      // Find the last entry
      console.log("1");
      const lastProduct = await productSchema.findOne({
        order: [['createdAt', 'DESC']] // Assuming you have a createdAt field, otherwise use the primary key (id)
      });
  
      if (!lastProduct) {
        return res.status(404).json({ error: 'No product found' });
      }
  
      // Delete the last entry
      await lastProduct.destroy();
      res.status(200).json({ message: 'Last product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error); // Log detailed error
      res.status(500).json({ error: error.message });
    }
  });



module.exports={prodrouter}