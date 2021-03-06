const mongoose = require("mongoose");

//user schema..
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:30,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:30
    },
    password:{
        type: String,
        min:6,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        max:50,
    }, 
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:String,
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("user",userSchema);