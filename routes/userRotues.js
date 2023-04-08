const { Router } = require("express");
const {
  AddNewUser,
  DeleteUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", GetAllUsers);
router.get("/:uuid", GetUserById);
router.post("/register", AddNewUser);
router.patch("/:uuid", UpdateUser);
router.delete("/:uuid", DeleteUser);

module.exports = router;
