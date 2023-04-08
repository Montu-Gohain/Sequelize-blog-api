const { Router } = require("express");
const {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetPostByID,
  Updatepost,
} = require("../controllers/postController");
const router = Router();

router.post("/", CreatePost);
router.get("/", GetAllPosts);
router.get("/:uuid", GetPostByID);
router.patch("/:uuid", Updatepost);
router.delete("/:uuid", DeletePost);

module.exports = router;
