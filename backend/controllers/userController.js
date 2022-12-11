import User from "../models/userModel.js";

//Update User
export const updatUser = async (req, res) => {
  //new MyModel(doc).save()
  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Single User
export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete User

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
