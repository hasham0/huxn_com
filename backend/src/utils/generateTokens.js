import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (data) => {
  return jwt.sign(
    { _id: data._id, email: data.email },
    process.env.ACCESS_TOKEN_SECRATE_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign({ _id: id }, process.env.REFRESH_TOKEN_SECRATE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE_KEY);
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRATE_KEY);
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
