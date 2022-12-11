import express from "express";
const router = express.Router();
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updatUser,
} from "../controllers/userController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndUser,
} from "../middlewares/verifyToken.js";

//router.get("/checkToken/", verifyTokenAndAdmin, (req, res) => {
//res.send("You are Admin user!");
//});

router.put("/:id", verifyTokenAndUser, updatUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/:id", verifyTokenAndUser, getSingleUser);
router.delete("/:id", verifyTokenAndUser, deleteUser);

export default router;
