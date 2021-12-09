const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

//middleware...
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


//Routes...
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);


module.exports = app;