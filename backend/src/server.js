import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



// middleware
if (process.env.NODE_ENV !== "production") {
app.use(
  cors({
  origin: "http://localhost:5173",
})
);
}
app.use(express.json());// this middleware is used to parse JSON bodies
app.use(rateLimiter);


// our custom middleware to log request method and URL
// app.use((req, res, next) => {
//   console.log(`Request Method is: ${req.method} & Request URL is: ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

connectDB().then(() => {
  app.listen(PORT, () => {
   console.log("Server is running on PORT: PORT");
});
})











