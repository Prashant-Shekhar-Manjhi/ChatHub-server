const postControllers = require("../controllers/postControllers");
const router = require("express").Router();

//create post
router.route("/")
.post(postControllers.createPost);

//get, update and delete post...
router.route("/:id")
.put(postControllers.updatePost)
.get(postControllers.getPost)
.delete(postControllers.deletePost);

//like post
router.route("/:id/like")
.put(postControllers.likePost);

//get timelines
router.route("/timelines/all")
.get(postControllers.getTimelines);

module.exports = router;