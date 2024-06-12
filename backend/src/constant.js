const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const DB_NAME = "ecom_huxn";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export { ACCESS_TOKEN, REFRESH_TOKEN, DB_NAME, cookieOptions };
