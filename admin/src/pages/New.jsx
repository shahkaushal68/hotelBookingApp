import React, { useState } from "react";
import "../style/new.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [file, setFile] = useState("");
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhlryopkr/image/upload",
        formData
      );
      const { url } = uploadRes.data;
      const newUser = {
        ...inputData,
        userImage: url,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_URI}/auth/register`,
        newUser
      );
      //.log(result);
      if (result.status === 200) {
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
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
                  <h1>{title}</h1>
                </div>
                <div className="bottom">
                  <div className="left">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
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
                          name="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>

                      {inputs.map((input, i) => (
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

export default New;
