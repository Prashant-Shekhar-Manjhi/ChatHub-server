const mongooes = require("mongoose");

////creating schema..

const messageSchema = new mongooes.Schema({
    conversationId:{
        type:String
    },
    messageText:{
        type:String
    },
    senderId:{
        type:String
    }
},{timestamps:true});

module.exports = mongooes.model("messages",messageSchema);