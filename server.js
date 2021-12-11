const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({path:"./config.env"})

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })


app.get("/",(req,res)=>{
    res.send("Hi, wellcome to my chathub..")
})
const port = Number(process.env.PORT) || 8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})