const mongooes = require("mongoose");

////creating schema..

const postSchema = new mongooes.Schema({
    userId:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:""
    },
    description:{
        type:String,
        max:500
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true});

module.exports = mongooes.model("post",postSchema);