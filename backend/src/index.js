// packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

// utils,routers and constant
import connectDB from "./config/dbConnection.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRoutes from "./routers/user.route.js";
import categoryRoutes from "./routers/category.route.js";
import productRoutes from "./routers/product.route.js";
import uploadRoutes from "./routers/upload.route.js";

// set variable
const app = express();

//note: set dotenv config_
dotenv.config({
  path: "../.env",
});

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// set routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);

// set public folder path
const __dirname = path.resolve();
app.use(
  "./public/temp",
  express.static(path.join(__dirname + "./public/temp"))
);

// set global level error handling middlwere
app.use(errorMiddleware);

/* database connection and app listen to port */
(async () =>
  connectDB().then((resolve) => {
    try {
      app.listen(process.env.PORT, () => {
        const { port } = resolve.connection;
        console.log(`db connect at port ${port}`);
        console.log(`app working => ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }))();
