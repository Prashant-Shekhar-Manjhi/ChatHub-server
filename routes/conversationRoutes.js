const conversationController = require("../controllers/conversationController");
const router = require("express").Router();

router.route("/").post(conversationController.createCoversation);
router.route("/:id").get(conversationController.getConversation);
router.route("/find/:firstUserId/:secondUserId").get(conversationController.getConversationOfTwoUsers);

module.exports = router;