const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require('passport');

mongoose.connect(keys.mongodb.dbUrl, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});
//initialize passport
app.use(passport.initialize())
//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.use("/users", usersRouter);

//server
app.listen(port);
console.log(`server listening on ${port} `);
