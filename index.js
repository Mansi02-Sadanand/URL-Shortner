const express = require("express");
const urlRoute = require("./routes/url");
const { connection } = require("./connection");
const path = require("path");
const { restrictTo, checkForAuthentication } = require("./middleware/auth");

const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const app = express();

const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

connection("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("connected to  mongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRouter);
app.use("/user", userRoute);

app.listen(1000, () => {
  console.log("server started");
});
