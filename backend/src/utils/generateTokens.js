import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (data) => {
  return jwt.sign(
    { _id: data._id.toString(), email: data.email.toString() },
    process.env.ACCESS_TOKEN_SECRATE_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign(
    { _id: id.toString() },
    process.env.REFRESH_TOKEN_SECRATE_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// const generateAccessToken = (res, data) => {
//   const token = jwt.sign(
//     { _id: data._id.toString(), email: data.email },
//     process.env.ACCESS_TOKEN_SECRATE_KEY,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );

//   const cookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "strict",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   };

//   // Set JWT as an HTTP-Only Cookie
//   res.cookie(ACCESS_TOKEN, token, cookieOptions);

//   return token;
// };

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
