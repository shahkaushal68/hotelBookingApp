import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faJetFighter,
  faGlobe,
  faCar,
  faPoo,
  faTaxi,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useContext } from "react";
import { search } from "../context/SearchContext";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(search);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [destination, setDestination] = useState("");
  const [optionOpen, setOptionOpen] = useState(false);

  const [optionData, setOptionData] = useState({
    adults: 1,
    childrens: 0,
    rooms: 1,
  });

  const handleOptionOpen = () => {
    setOptionOpen(!optionOpen);
    setDateOpen(false);
  };

  const handleDateOpen = () => {
    setDateOpen(!dateOpen);
    setOptionOpen(false);
  };

  const handleIncrement = (title) => {
    //console.log("title", title);
    setOptionData((prev) => {
      return {
        ...prev,
        [title]: optionData[title] + 1,
      };
    });
  };

  const handleDecrement = (title) => {
    setOptionData((prev) => {
      return {
        ...prev,
        [title]: optionData[title] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination,
        date,
        optionData,
      },
    });
    navigate("/hotels", { state: { destination, date, optionData } });
  };
  //console.log("state", dispatch);

  return (
    <div className="header-section">
      <div className="container header-banner">
        <div className="header-navigation">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link active" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faBed} />
                </span>
                Stays
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faJetFighter} />
                </span>
                Flight
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                Flight + Hotel
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faCar} />
                </span>
                Car rentals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faPoo} />
                </span>
                Attractions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span className="nav-icon">
                  <FontAwesomeIcon icon={faTaxi} />
                </span>
                Airport Taxis
              </Link>
            </li>
          </ul>
        </div>
        {type !== "list" && (
          <>
            <div className="banner-text">
              <h2 className="banner-heading">
                Save 30% or more with Black Friday Deals
              </h2>
              <h6 className="banner-subheading">
                From seaside villas to city homes, book the perfect stay for
                less
              </h6>
              <button type="button" className="btn btn-primary find-deals">
                Find Deals
              </button>
            </div>
            <div className="header-search">
              <div className="header-input common-div">
                <span>
                  <FontAwesomeIcon icon={faBed} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="checkinout-search common-div">
                <span>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>
                <div onClick={handleDateOpen} style={{ width: "100%" }}>
                  {`${format(date[0].startDate, "dd/MM/yyyy")} TO ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </div>
                {dateOpen && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="daterange-selection"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="room-search common-div">
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <div onClick={handleOptionOpen}>
                  {optionData.adults} Adults - {optionData.childrens} Children -{" "}
                  {optionData.rooms} room
                </div>
                {optionOpen && (
                  <div className="options-block">
                    <div className="different-options">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="optionlabel-section">
                            <b className="option-label">Adults</b>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="option-value-section">
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleDecrement("adults")}
                              disabled={optionData.adults < 2}
                            >
                              -
                            </button>
                            <span className="option-value">
                              {optionData.adults}
                            </span>
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleIncrement("adults")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="different-options">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="optionlabel-section">
                            <b className="option-label">Childrens</b>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="option-value-section">
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleDecrement("childrens")}
                              disabled={optionData.childrens < 1}
                            >
                              -
                            </button>
                            <span className="option-value">
                              {optionData.childrens}
                            </span>
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleIncrement("childrens")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="different-options">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="optionlabel-section">
                            <b className="option-label">Rooms</b>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="option-value-section">
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleDecrement("rooms")}
                              disabled={optionData.rooms < 2}
                            >
                              -
                            </button>
                            <span className="option-value">
                              {optionData.rooms}
                            </span>
                            <button
                              type="button"
                              className="btn incbutton"
                              onClick={() => handleIncrement("rooms")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="search-button">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
