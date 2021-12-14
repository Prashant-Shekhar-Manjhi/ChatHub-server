const conversation = require("../models/conversationModel");

//create conversation...
exports.createCoversation = async(req,res)=>{
   const newConversation = new conversation({
       members:[req.body.senderId,req.body.receiverId]
   })
   try{
    const conversation = await newConversation.save();
    res.status(200).json(conversation);
   }catch(error){
       res.status(500).json(error)
   }
   ;
}

//get conversation...


exports.getConversation = async (req,res)=>{
    try{
        const conversations = await conversation.find({
            members:{$in : req.params.id}
        });
        res.status(200).json(conversations);
    }catch(error){
        res.status(500).json(error)
    }
}

// get conversation of two user id...
exports.getConversationOfTwoUsers = async (req,res)=>{
    try {
        const fetchedConversation = await conversation.findOne({
          members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(fetchedConversation)
      } catch (err) {
        res.status(500).json(err);
      }
}