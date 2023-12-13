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

module.exports.getAllUsers = getAllUsers;
module.exports.postUser = postUser;

