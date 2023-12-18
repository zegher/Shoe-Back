const Users = require("../../../models/User");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const login = async (req, res) => {
    try {
        // Find user by username
        const user = await Users.findOne({ username: req.body.username });
        // If user not found, send error response
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User not found",
            });
        }
        // Compare provided password with stored password
        const isMatch = req.body.password === user.password;
        // If password doesn't match, send error response
        if (!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials",
            });
        }
        // If password matches, create and sign a JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};



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
        u.admin = user.admin;
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

        //if user is not admin
        if (!user.admin) {
            return res.status(401).json({
                status: "error",
                message: "User is not authorized to update password",
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

//get user by id
//NEEDS AUTHENTICATION LATER ON
const getUserById = async (req, res) => {
    try{
        let user = await Users.findById(req.params.id);
        res.json({
            status: "success",
            message: "User retrieved",
            data: [{
                user: user,
            }],
        });
    } catch (err) {
        res.json({
            status: "error",
            message: "User not retrieved",
        });
    }
};

module.exports.getAllUsers = getAllUsers;
module.exports.postUser = postUser;
module.exports.putUserPasswordById = putUserPasswordById;
module.exports.getUserById = getUserById;
module.exports.login = login;
