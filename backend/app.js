const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);

// util
const connectMongoDB = require('./util/MDB');
// const PORT = process.env.PORT

const userRoutes = require('./routes/user');

app.use(cors());

// Receive data json and form data from the client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
app.use(userRoutes);

connectMongoDB(process.env.MONGO_URL)
    .then(() =>
        console.log("Mongoose Connect..."))
    // mongoose.connection.dropDatabase()
    .catch(err =>
        console.log(err))

app.listen(3000, () => {
    console.log("Server is running... 3000");
});