const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const app = express();

// =================================================================================================== middleware goes here

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// =================================================================================================== mongoose connection goes here 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// =================================================================================================== logs if connection fails or not

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected!");
});

// =================================================================================================== api routes go here

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =================================================================================================== server connection goes here

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

