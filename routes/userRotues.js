const { Router } = require("express");
const {
  AddNewUser,
  DeleteUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  LoginUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", GetAllUsers);
router.get("/:uuid", GetUserById);
router.post("/register", AddNewUser);
router.patch("/:uuid", UpdateUser);
router.delete("/:uuid", DeleteUser);
router.post("/login", LoginUser);

module.exports = router;
