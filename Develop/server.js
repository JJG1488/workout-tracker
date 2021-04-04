const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

// =================================================================================================== middleware goes here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// =================================================================================================== mongoose connection goes here 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// =================================================================================================== api routes go here 


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  