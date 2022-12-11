import express from "express";
const router = express.Router();
import {
  createRoom,
  deleteRoom,
  getAllrooms,
  getSingleRoom,
  updateRoom,
} from "../controllers/roomController.js";

import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

router.post("/:hotelId", verifyTokenAndAdmin, createRoom);
router.get("/", getAllrooms);
router.get("/:id", getSingleRoom);
router.put("/:id", verifyTokenAndAdmin, updateRoom);
router.delete("/:id/:hotelId", verifyTokenAndAdmin, deleteRoom);

export default router;
