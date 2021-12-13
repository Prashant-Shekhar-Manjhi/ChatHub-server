const mongooes = require("mongoose");

////creating schema..

const conversationSchema = new mongooes.Schema({
    members:{
        type:Array
    }
},{timestamps:true});

module.exports = mongooes.model("conversation",conversationSchema);