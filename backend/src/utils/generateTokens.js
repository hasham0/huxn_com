import "dotenv/config";
import jwt from "jsonwebtoken";
const generateAccessToken = (data) => {
  console.log("🚀 ~ generateAccessToken ~ data:", data);
  return jwt.sign(
    { _id: data._id.toString(), email: data.email },
    process.env.ACCESS_TOKEN_SECRATE_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE_KEY);
};

export { generateAccessToken, verifyAccessToken };
