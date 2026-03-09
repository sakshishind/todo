const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // load .env variables

const app = express();

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

// mongo connection using env
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected Successfully"))
.catch(err=> console.log(err));

app.get("/", (req,res)=>{
  res.send("API working");
});

// server start
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});