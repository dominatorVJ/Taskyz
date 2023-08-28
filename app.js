const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");

// initialise .env
dotenv.config();

// select port
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // inbuilt middleware which parses the json to javascript object so that we can make use of the request data (inplace of body parser)
app.use(cookieParser());
// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(
    process.env.MONGO_URI,
    {}
  )
  .then(console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`To do app listening at http://localhost:${port}`);
});

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.use(authRoutes);
app.use(todoRoutes);
