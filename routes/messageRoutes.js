const messageController = require("../controllers/messageControllers");
const router = require("express").Router();

router.route("/").post(messageController.createMessage);
router.route("/:conversationId").get(messageController.getMessages);

module.exports = router;