const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt")

exports.updateUser = async (req, res)=>{
    if(req.body.id === req.params.id){
        try{
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
        }catch(err){
            return res.status(500).json({
                status:"fail",
                message:"",
                error:err
            })
        }
        try{
            const user = await userModel.findByIdAndUpdate(req.params.id,{$set: req.body});
            res.status(200).json({
                status:"success",
                message:"Account has been updated!"
            })

        }catch(err){
            return res.status(400).json({
                status:"fail",
                message:"",
                error:err
            });
        }
    }else{
        return res.status(403).json({
            status:"fail",
            message:"You can update only your account."
        })
    }
}


exports.deleteUser = async (req, res)=>{
    if(req.body.id === req.params.id){
        try{
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status:"success",
                message:"Your account has been deleted!"
            })
        }catch(err){
            return res.status(400).json({
                status:"fail",
                message:"",
                error:err
            });
        }
    }else{
        return res.status(403).json({
            status:"fail",
            message:"You can delete only your account."
        })
    }

}


exports.getUser = async (req, res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json({
            status:"success",
            user:other
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Invalid user"
        })
    }
}


exports.followUser = async (req,res)=>{
    if(req.params.id !== req.body.id){
    try{
        const user = await userModel.findById(req.params.id);
        const currentUser = await userModel.findById(req.body.id);
        if(!user.followers.includes(req.body.id)){
            await user.updateOne({$push:{ followers: req.body.id } });
            await currentUser.updateOne({$push: { followings: req.params.id } });
            res.status(200).json("Followed successfully!");
        }
        else{
            res.status(403).json("You allready follow him!");
        }
    }catch(err){
        res.status(500).json(err);
    }
    }
    else{
        res.status(500).json("You can't follow Yourself!");
    }
}


exports.unFollowUser = async (req, res)=>{
    if(req.params.id !== req.body.id){
        try{
            const user = await userModel.findById(req.params.id);
            const currentUser = await userModel.findById(req.body.id);
            if(user.followers.includes(req.body.id)){
                await user.updateOne({$pull:{ followers: req.body.id } });
                await currentUser.updateOne({$pull: { followings: req.params.id } });
                res.status(200).json("Unfollowed successfully!");
            }
            else{
                res.status(403).json("You have not follow him!");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("You can't unfollow Yourself!");
    }
}


 exports.getAllFriends = async (req,res)=>{
     try{
         const user = await userModel.findById(req.params.id);
         const friends = await Promise.all(
             user.followings.map(friendId => userModel.findById(friendId))
         );
         let friendList = [];
         friends.map(friend => {
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
         });
         res.status(200).json({
             status:"success",
             friendList
         })
     }catch(err){
         res.status(500).json({
             status: "Failure",
             err
         })
     }
 }