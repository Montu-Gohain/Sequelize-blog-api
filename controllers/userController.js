const { User, Post } = require("../models");
const CreateError = require("http-errors");
const bcrypt = require("bcryptjs");

const hash_password = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.log(error.message);
  }
  return null;
};

const AddNewUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const encrypted_password = await hash_password(password);
  try {
    // * First we'll check if the email already exist in DB or not.

    const email_exist = await User.findOne({
      where: { email },
    });

    if (email_exist) {
      return next(CreateError.BadRequest("Email already exist."));
    }

    const new_user = await User.create({
      name,
      email,
      role,
      password: encrypted_password,
    });

    res.status(201).send({
      success: true,
      message: "New user created successsfully.",
      data: new_user,
    });
  } catch (error) {
    next(CreateError.InternalServerError(error.message));
  }
};

const GetAllUsers = async (req, res, next) => {
  try {
    const all_users = await User.findAll();

    res.status(200).send({
      success: true,
      data: all_users,
    });
  } catch (error) {
    next(CreateError.InternalServerError(error.message));
  }
};

const GetUserById = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const find_user = await User.findOne({
      where: { uuid },
      include: "post",
    });

    if (!find_user) {
      return next(CreateError.NotFound("User not found with this id."));
    }
    res.status(200).send({
      success: true,
      data: find_user,
    });
  } catch (error) {
    next(CreateError.InternalServerError(error.message));
  }
};

const UpdateUser = async (req, res, next) => {
  const uuid = req.params.uuid;
  const { name, role } = req.body;
  try {
    //* First we'll check if the user exist.
    const find_user = await User.findOne({
      where: { uuid },
    });

    if (!find_user) {
      return next(CreateError.NotFound("User not found with this id."));
    }

    // * Okay we have the user in DB and now we'll update the user details.

    find_user.name = name;
    find_user.role = role;

    await find_user.save(); // * This will save the updated user details.
    res.status(200).send({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    next(CreateError.InternalServerError(error.message));
  }
};

const DeleteUser = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const find_user = await User.findOne({
      where: { uuid },
    });
    if (!find_user) {
      return next(CreateError.NotFound("User not found with this id."));
    }
    await find_user.destroy(); // * It will delete the user from DB.

    res.status(200).send({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(CreateError.InternalServerError(error.message));
  }
};

module.exports = {
  AddNewUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
};
