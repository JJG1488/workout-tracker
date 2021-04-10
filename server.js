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
app.use(express.static("public"));

// myFirstDatabase
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jg14:PantheraLeo@cluster0.muarw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("workout").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(

    process.env.MONGODB_URI || 'mongodb://localhost/workout',
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

