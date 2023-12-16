require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


// connect to mongodb
mongoose.connect(process.env.MONGODB);

// console log .env MONGODB
console.log(process.env.MONGODB);

// check if connection works
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//import routes
const shoesRoutes = require("./routes/api/v1/shoes");
const userRoutes = require("./routes/api/v1/user");
app.use(express.json());

//use routes
app.use("/api/v1/shoes", shoesRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})