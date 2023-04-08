const { User, Post } = require("../models");
const CreateError = require("http-errors");

const CreatePost = async (req, res, next) => {
  const { body, userUuid } = req.body;
  try {
    const find_user = await User.findOne({
      where: {
        uuid: userUuid,
      },
    });
    if (!find_user) {
      return next(
        CreateError.NotFound("User not found so can't create a post.")
      );
    }
    const new_post = await Post.create({ body, userId: find_user.id });

    res.status(201).send({
      success: true,
      message: "Post created successfully.",
      data: new_post,
    });
  } catch (error) {
    console.log(error.message);
    next(CreateError.InternalServerError(error.message));
  }
};
const GetAllPosts = async (req, res, next) => {
  try {
    const all_posts = await Post.findAll({
      include: "user",
    });
    res.status(200).send({
      success: true,
      data: all_posts,
    });
  } catch (error) {
    console.log(error.message);
    next(CreateError.InternalServerError(error.message));
  }
};
const GetPostByID = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const get_the_post = await Post.findOne({
      where: { uuid },
    });
    if (!get_the_post) {
      next(CreateError.NotFound("Post not found with this ID"));
    }
    res.status(200).send({
      success: true,
      data: get_the_post,
    });
  } catch (error) {
    console.log(error.message);
    next(CreateError.InternalServerError(error.message));
  }
};
const Updatepost = async (req, res, next) => {
  const uuid = req.params.uuid;
  const { body } = req.body;
  try {
    const get_the_post = await Post.findOne({
      where: { uuid },
    });
    get_the_post.body = body;

    await get_the_post.save();
    res.status(200).send({
      success: true,
      message: "Post updated successfully.",
    });
  } catch (error) {
    console.log(error.message);
    next(CreateError.InternalServerError(error.message));
  }
};
const DeletePost = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const get_the_post = await Post.findOne({
      where: { uuid },
    });

    await get_the_post.destroy(); //*Let's delete this post.

    res.status(200).send({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.log(error.message);
    next(CreateError.InternalServerError(error.message));
  }
};

module.exports = {
  CreatePost,
  GetAllPosts,
  GetPostByID,
  Updatepost,
  DeletePost,
};
