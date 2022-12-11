import React, { useContext, useState } from "react";
import "../style/singleHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SubScribe from "../components/SubScribe";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { search } from "../context/SearchContext";
import ReservedRooms from "../components/ReservedRooms";
import { auth } from "../context/AuthContext";
//import { format } from "date-fns";

const SingleHotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useFetch(
    `${process.env.REACT_APP_API_URI}/hotels/find/${id}`
  );

  //console.log("data", data);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const {
    state: { dates, options },
  } = useContext(search);
  const {
    state: { user },
  } = useContext(auth);
  //console.log("state", user);
  let date_1 = dates[0]?.startDate;
  let date_2 = dates[0]?.endDate;
  let difference = date_2?.getTime() - date_1?.getTime();
  var Difference_In_Days = difference / (1000 * 3600 * 24);
  //console.log(Difference_In_Days);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          {user ? (
            <button
              className="bookNow"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Reserve or Book Now!
            </button>
          ) : (
            <button
              className="bookNow"
              type="button"
              onClick={() => navigate("/login")}
            >
              Reserve or Book Now!
            </button>
          )}
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.city}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.type}</h1>
              <p className="hotelDesc">{data.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {Difference_In_Days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>
                  ${Difference_In_Days * data.cheapestPrice * options.rooms}
                </b>
                ({Difference_In_Days} nights)
              </h2>
              {user ? (
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Reserve or Book Now!
                </button>
              ) : (
                <button type="button" onClick={() => navigate("/login")}>
                  Reserve or Book Now!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="subscribeSection">
        <SubScribe />
      </div>

      <Footer />
      <ReservedRooms hotelId={id} />
    </div>
  );
};

export default SingleHotel;
