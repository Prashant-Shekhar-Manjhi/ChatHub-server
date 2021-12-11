const postModel = require("../models/PostModel");
const userModel = require("../models/UserModel");
// exports.example = (req,res)=>{
//     res.send("post page!")
// }

//create post
exports.createPost = async (req,res)=>{
    const post = new postModel(req.body);
    try{
        const newPost = await post.save();
        res.status(200).json({
            status:"success",
            newPost
        }) 

    }catch(err){
        res.status(500).json({
            status:"fail",
            message:"Unable to post!",
            error:error
        })
    }
}
//update post
exports.updatePost = async (req,res)=>{
    const post = await postModel.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set:req.body
            });
            res.status(200).json({
                status:"success",
                message:"updated!",
            })
        }else{
            res.status(403).json({
                status:"fail",
                message:"You can update only your posts!"
            })
        }
        
    }catch(err){
        res.status(500).json({
            status:"fail",
            message:"unable to update",
            err
        });
    }    
}
//delete post
exports.deletePost = async (req,res)=>{
    const post = await postModel.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json({
                status:"success",
                message:"Post has been deleted!"
            })
        }else{
            res.status(403).json({
                status:"fail",
                message:"You cannot delete other's account!"
            })
        }

    }catch(err){
        res.status(500).json({
            status:"fail",
            message:"Unable to delete Post!",
            err
        })
    }
}
//like post

exports.likePost = async (req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json({
                status:"success",
                message:"Liked!"
            })
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json({
                status:"success",
                message:"disliked!"
            })
        }
    }catch(err){
        res.status(500).json({
            status:"fail",
            message:"Unable to like!",
            err
        })
    }
}
//get a post
exports.getPost = async (req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        res.status(200).json({
            status:"success",
            post: post
        })
    }catch(error){
        res.status(500).json({
            status:"fail",
            error: err
        })
    }
}
//get timeline posts
exports.getTimelines = async (req,res)=>{
    try{
        const currentUser = await userModel.findById(req.params.userId);
        const userPosts = await postModel.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
                return postModel.find({userId: friendId});
            })
        )
        res.status(200).json({
            status:'success',
            timelines: userPosts.concat(...friendPosts)
        })
    }catch(err){
        res.status(500).json({
            status:"fail",
            error:err
        })
    }
}
//getUserPosts..
exports.getUserPosts = async (req,res)=>{
    try{
        const posts = await postModel.find({userId: req.params.id});
        res.status(200).json({
            status:'success',
            posts
        })
    }catch(err){
        res.status(500).json({
            status:"fail",
            error:err
        })
    }
}
