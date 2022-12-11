import express from "express";
const router = express.Router();
import {
  addHotel,
  countByTypes,
  deleteHotel,
  getAllHotels,
  getHotelCountbasedCity,
  getHotelRooms,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

router.get("/", getAllHotels);
router.get("/find/:id", getSingleHotel);
router.post("/", verifyTokenAndAdmin, addHotel);
router.put("/:id", verifyTokenAndAdmin, updateHotel);
router.delete("/:id", verifyTokenAndAdmin, deleteHotel);
router.get("/countByCities", getHotelCountbasedCity);
router.get("/countByTypes", countByTypes);
router.get("/rooms/:id", getHotelRooms);

export default router;
