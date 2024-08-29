import express from "express";
import mongoose from "mongoose";
import { PORT, dbConnect } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'

const app = express();

// Middleware for parsing
app.use(express.json());

//Middleware to handle cors
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Middle for book routes
app.use("/books", booksRoute);

// DB and server connection
mongoose
  .connect(dbConnect)
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
