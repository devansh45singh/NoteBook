import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



// middleware
app.use(
  cors({
  origin: "http://localhost:5173",
})
);
app.use(express.json());// this middleware is used to parse JSON bodies
app.use(rateLimiter);


// our custom middleware to log request method and URL
// app.use((req, res, next) => {
//   console.log(`Request Method is: ${req.method} & Request URL is: ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
   console.log("Server is running on PORT: PORT");
});
})











