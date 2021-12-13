const conversationController = require("../controllers/conversationController");
const router = require("express").Router();

router.route("/").post(conversationController.createCoversation);
router.route("/:id").get(conversationController.getConversation);

module.exports = router;