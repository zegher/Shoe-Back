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


module.exports.getAllUsers = getAllUsers;

