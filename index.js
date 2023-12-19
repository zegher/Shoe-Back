// import dependencies
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const http = require('http');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Primus = require('primus');
const server = http.createServer(app);
const primus = new Primus(server, { transformer: 'websockets' });


// connect to mongodb
mongoose.connect(process.env.MONGODB);

// console log .env MONGODB
console.log(process.env.MONGODB);

// check if connection works
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

//import routes
const shoesRoutes = require("./routes/api/v1/shoes");
const userRoutes = require("./routes/api/v1/user");
app.use(express.json());

//use routes
app.use("/api/v1/shoes", shoesRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app; // Export the app object