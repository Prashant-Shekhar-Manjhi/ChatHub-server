const router = require("express").Router();
const userController = require("../controllers/userController")

//update user...
router.route("/:id").put(userController.updateUser);

//delete user...
router.route("/:id").delete(userController.deleteUser);


//get user...
router.route("/:id").get(userController.getUser);


//follow user...
router.route("/:id/follow").put(userController.followUser);


//unfollow user...
router.route("/:id/unfollow").put(userController.unFollowUser);


module.exports = router;