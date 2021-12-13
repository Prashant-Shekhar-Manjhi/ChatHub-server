const mongooes = require("mongoose");

////creating schema..

const commentSchema = new mongooes.Schema({
   postId:{
       type:String,
       required:true
   },
   userId:{
       type:String,
       required:true
   },
   text:{
       type:String,
       required:true
   },
   likes:{
       type:Array
   },

},{timestamps:true});

module.exports = mongooes.model("comments",commentSchema);