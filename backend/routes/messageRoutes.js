const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  sendMessage,
  fetchMessage,
} = require("../controllers/messageControllers");

router.route("/")
.post(auth, sendMessage);

router.route("/:chatId")
.get(auth, fetchMessage);

module.exports = router;
