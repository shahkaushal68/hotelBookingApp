import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

//Add Hotel
export const addHotel = async (req, res) => {
  //new MyModel(doc).save()
  const newHotel = new Hotel(req.body);
  try {
    const result = await newHotel.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Hotel
export const updateHotel = async (req, res) => {
  //new MyModel(doc).save()
  try {
    const result = await Hotel.findByIdAndUpdate(
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
export const getAllHotels = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 1000 },
    }).limit(req.query.limits);
    res.status(200).json(allHotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Single hotel
export const getSingleHotel = async (req, res) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Hotel

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get HotelCount based on city

export const getHotelCountbasedCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  //console.log("cities", cities);
  try {
    const items = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(items);
  } catch (error) {
    //console.log("getHotelCountbasedCity", error);
    res.status(500).json(error);
  }
};

export const countByTypes = async (req, res) => {
  const getHotelCount = await Hotel.countDocuments({ type: "Hotel" });
  const getGuestHouseCount = await Hotel.countDocuments({
    type: "Guest House",
  });
  const getApartmentCount = await Hotel.countDocuments({ type: "Apartment" });
  const getHostelCount = await Hotel.countDocuments({ type: "Hostel" });
  const getResortCount = await Hotel.countDocuments({ type: "Resort" });
  try {
    res.status(200).json([
      {
        type: "Hotel",
        count: getHotelCount,
      },
      {
        type: "Guest House",
        count: getGuestHouseCount,
      },
      {
        type: "Apartment",
        count: getApartmentCount,
      },
      {
        type: "Hostel",
        count: getHostelCount,
      },
      {
        type: "Resort",
        count: getResortCount,
      },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
