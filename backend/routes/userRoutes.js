const router = require("express").Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const auth = require("../middleware/authMiddleware");

router.route("/register")
.post(registerUser)

router.route('/')
.get(auth, allUsers);

router.route("/login")
.post(loginUser);
module.exports = router;
