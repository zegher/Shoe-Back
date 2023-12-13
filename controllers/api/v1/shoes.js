const Shoes = require("../../../models/Shoe");

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

//controller function for creating a new shoe
const createShoe = async (req, res) => {
    try{
        let shoe = req.body.shoe;
        if (!shoe) {
            return res.status(400).json({
                status: "error",
                message: "Shoe data not provided in the request body",
            });
        }
        let s = new Shoes();
        s.brand = shoe.brand;
        s.color = shoe.color;
        s.lacesColor = shoe.lacesColor;
        s.soleColor = shoe.soleColor;
        s.logoColor = shoe.logoColor;
        s.size = shoe.size;
        s.price = shoe.price;
        await s.save();

        res.json({
            status: "success",
            message: "Shoe created successfully",
            data: [
                {
                    brand: s.brand,
                    color: s.color,
                    lacesColor: s.lacesColor,
                    soleColor: s.soleColor,
                    logoColor: s.logoColor,
                    size: s.size,
                    price: s.price, 
                }
            ]
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Shoe not created",
        });
    }
};

module.exports.createShoe = createShoe;
module.exports.getAllShoes = getAllShoes;