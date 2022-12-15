import React, { useState } from "react";
import "../style/new.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { hotelInputs } from "../formSource";
import useFetch from "../hooks/useFetch";

const NewHotel = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [inputData, setInputData] = useState({});
  const [rooms, setRooms] = useState([]);
  //const navigate = useNavigate();

  const { loading, data } = useFetch(`${process.env.REACT_APP_API_URI}/rooms`);

  console.log(rooms);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    let values = Array.from(e.target.selectedOptions, (option) => option.value);
    //console.log(value);
    setRooms(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/lamadev/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...inputData,
        rooms,
        phots: list,
      };

      await axios.post("/hotels", newhotel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header setNavOpen={setNavOpen} />

      <div className="container-fluid">
        <div className="row">
          <Sidebar navOpen={navOpen} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="new">
              <div className="newContainer">
                <div className="top">
                  <h1>Add New Hotel</h1>
                </div>
                <div className="bottom">
                  <div className="left">
                    <img
                      src={
                        files
                          ? URL.createObjectURL(files[0])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="right">
                    <form onSubmit={handleSubmit}>
                      <div className="formInput">
                        <label htmlFor="file">
                          Image:
                          <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                          type="file"
                          name="files"
                          multiple
                          onChange={(e) => setFiles(e.target.files)}
                        />
                      </div>

                      {hotelInputs.map((input, i) => (
                        <div className="formInput" key={i}>
                          <label>{input.label}</label>
                          <input
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                      <div className="formInput">
                        <label className="form-label">Featured</label>
                        <select
                          className="form-select"
                          name="featured"
                          onChange={handleChange}
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                      <label className="form-label">Select Rooms</label>
                      <select
                        onChange={handleSelect}
                        multiple
                        className="form-select"
                        name="rooms"
                      >
                        {loading
                          ? "Loading..."
                          : data &&
                            data.map((room) => (
                              <option value={room._id} key={room._id}>
                                {room.title}
                              </option>
                            ))}
                      </select>
                      <button>Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
