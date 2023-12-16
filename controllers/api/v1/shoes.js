//allow access control allow origin
const cors = require('cors');
const Shoes = require("../../../models/Shoe");
const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // this is the API server's address
      changeOrigin: true,
    })
  );
};
app.use(cors());

//controller function for getting all shoes
const getAllShoes = async (req, res) => {
    try{
        let shoes = await Shoes.find({});
        res.json({
            status: "success",
            message: "All shoes retrieved",
            data: [{
                shoeOrders: shoes,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Shoes not retrieved",
        });
    }
};

//controller function for getting a shoe by id
const getShoeById = async (req, res) => {
    try{
        let shoe = await Shoes.findById(req.params.id);
        let shoeOrders = await Shoes.find({shoe: shoe._id});

        res.json({
            status: "success",
            message: "Shoe retrieved",
            data: [{
                shoe: shoe,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Shoe not retrieved",
        });
    }
};

//controller function for creating a new shoe
const createShoe = async (req, res) => {
    console.log('Request Body:', req.body);
    try{
        let shoe = req.body;
        if (!shoe) {
            return res.status(400).json({
                status: "error",
                message: "Shoe data not provided in the request body",
            });
        }
        let s = new Shoes();
        s.brand = shoe.brand;
        s.lacesColor = shoe.lacesColor;
        s.sole_1Color = shoe.sole_1Color;
        s.sole_2Color = shoe.sole_2Color;
        s.insideColor = shoe.insideColor;
        s.outside_1Color = shoe.outside_1Color;
        s.outside_2Color = shoe.outside_2Color;
        s.status = shoe.status;
        s.size = shoe.size;
        s.price = shoe.price;
        await s.save();

        res.json({
            status: "success",
            message: "Shoe created successfully",
            data: [
                {
                    brand: s.brand,
                    lacesColor: s.lacesColor,
                    sole_1Color: s.sole_1Color,
                    sole_2Color: s.sole_2Color,
                    insideColor: s.insideColor,
                    outside_1Color: s.outside_1Color,
                    outside_2Color: s.outside_2Color,
                    status: s.status,
                    size: s.size,
                    price: s.price,
                }
            ]
        });
    } catch (err) {
        res.json({
            status: "error",
            message: err.message || "Shoe not created"
        });
    }
};

//delete a shoe by id
//NEEDS AUHTENTICATION LATER ON
const deleteShoeById = async (req, res) => {
    try{
        let shoe = await Shoes.findByIdAndDelete(req.params.id);
        s.status = shoe.status;
        res.json({
            status: "success",
            message: "Shoe deleted",
            data: [{
                shoe: shoe,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Shoe not deleted",
        });
    }
};

//put a shoe by id (update status to delivered)
//NEEDS AUTHENTICATION LATER ON
const putShoeById = async (req, res) => {
    try{
        let shoe = await Shoes.findByIdAndUpdate(req.params.id);
        shoe.status = "delivered";
        await shoe.save();
        res.json({
            status: "success",
            message: "Shoe updated",
            data: [{
                shoe: shoe,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Shoe not updated",
        });
    }
};

module.exports.createShoe = createShoe;
module.exports.getAllShoes = getAllShoes;
module.exports.getShoeById = getShoeById;
module.exports.deleteShoeById = deleteShoeById;
module.exports.putShoeById = putShoeById;