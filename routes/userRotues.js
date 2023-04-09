const { Router } = require("express");
const {
  AddNewUser,
  DeleteUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  LoginUser,
} = require("../controllers/userController");
const { verifyAccessToken } = require("../helpers/jwt_helper");

const router = Router();

router.get("/", verifyAccessToken, GetAllUsers);
router.get("/:uuid", GetUserById);
router.post("/register", AddNewUser);
router.patch("/:uuid", UpdateUser);
router.delete("/:uuid", DeleteUser);
router.post("/login", LoginUser);

module.exports = router;
