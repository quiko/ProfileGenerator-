const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const signToken = user => {
  return jwt.sign(
    {
      iss: "quiko",
      sub: user.id,
    },
    jwtSecret,
    {
      expiresIn: '2d'
    }
  );
};
module.exports = {
  signUp: async (req, res, next) => {
    console.log("sing up called !");
    const { email, password } = req.value.body;
    //check if user exists in db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json("email already in use");
    }
    //if not create a new user in db
    const newUser = new User({ email, password });
    await newUser.save();
    //generate token
    const token = signToken(newUser);
    //respond with token
    res.json({ token });
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({token})
  },
  secret: async (req, res, next) => {
    console.log("youpie!");
    res.json({ secret : "resource"})
    
  }
};
