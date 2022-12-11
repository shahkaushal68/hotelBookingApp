import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

//Create Room

export const createRoom = async (req, res) => {
  const newRoom = new Room(req.body);
  const hotelId = req.params.hotelId;
  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Room
export const updateRoom = async (req, res) => {
  //new MyModel(doc).save()
  try {
    const result = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get All Hotels
export const getAllrooms = async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Single hotel
export const getSingleRoom = async (req, res) => {
  try {
    const singleRoom = await Room.findById(req.params.id);
    res.status(200).json(singleRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Hotel

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(req.params.hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).json("Room has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
