const dotenv = require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

// =================================================================================================== middleware goes here

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./docs"));
app.use(express.static("public"));


const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Connected to client")
    client.close();
});

mongoose.connect(
    process.env.MONGODB_URI || uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =================================================================================================== server connection goes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

