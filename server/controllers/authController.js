const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required."));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(success(409, "User is already registered."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.send(
      success(201, {
        user,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required."));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send(error(404, "User is not registered."));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.send(error(403, "Incorrect password."));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(201, { accessToken }));
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error(401, error));
  }
};

// THIS API WILL CHECK THE REFRESH TOKEN VALIDITY AND GENERATE A NEW ACCESS TOKEN
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.send(error(401, "Refresh token in cookie is required."));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      "process.env.REFRESH_TOKEN_PRIVATE_KEY"
    );

    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });

    return res.send(success(201, { accessToken }));
  } catch (e) {
    console.log(e);
    return res.send(error(401, "Invalid refresh token."));
  }
};

// internal functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, "process.env.ACCESS_TOKEN_PRIVATE_KEY", {
      expiresIn: "15m",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Errorr: ", error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, "process.env.REFRESH_TOKEN_PRIVATE_KEY", {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Errorr: ", error);
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};

// JWT.IO website name
