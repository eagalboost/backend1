import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can update only your account!"));
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.country = req.body.country || user.country;
    user.phone = req.body.phone || user.phone;

    if (req.body.img) {
      user.img = req.body.img;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};
