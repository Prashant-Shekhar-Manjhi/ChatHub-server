const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");
const conversationRouter = require("./routes/conversationRoutes");
const messageRouter = require("./routes/messageRoutes");
const cors = require('cors');
const multer  = require('multer');
const path = require('path');
// const fs = require('fs');
// const { promisify } = require('util');
// const unlinkAsync = promisify(fs.unlink);




const app = express();

//middleware...
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"public/images")))

//File Uploading...
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload = multer({storage});
app.post("/api/upload",upload.single("file"),async (req,res)=>{
    try{
        return res.status(200).json({
            status:"success",
            message:"File uploaded successfully"
        })
    }catch(error){
        console.log(error)
    }
})


//Routes...
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/conversation",conversationRouter);
app.use("/api/message", messageRouter);


module.exports = app;