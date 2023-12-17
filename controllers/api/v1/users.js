const Users = require("../../../models/User");

//controller functino for getting al users
const getAllUsers = async (req, res) => {
    try{
        let users = await Users.find({});
        res.json({
            status: "success",
            message: "All users retrieved",
            data: [{
                userOrders: users,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "Users not retrieved",
        });
    }
}


const postUser = async (req, res) => {
    console.log('Request Body:', req.body);
    try{
        let user = req.body;
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User data not provided in the request body",
            });
        }
        let u = new Users();
        u.username = user.username;
        u.password = user.password;
        u.email = user.email;
        u.shoeSize = user.shoeSize;
        u.adress = user.adress;
        u.country = user.country;
        await u.save();
        res.json({
            status: "success",
            message: "User created",
            data: [{
                user: u,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "User not created",
        });
    }
}

const putUserPasswordById = async (req, res) => {
    try {
        let user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        // Update the existing user's password
        user.password = req.body.password;
        await user.save();

        res.json({
            status: "success",
            message: "User password updated",
            data: [{
                user: user,
            }],
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "User password not updated",
        });
    }
};


module.exports.getAllUsers = getAllUsers;
module.exports.postUser = postUser;
module.exports.putUserPasswordById = putUserPasswordById;

