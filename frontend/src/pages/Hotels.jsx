import React, { useState } from "react";
import "../style/hotels.css";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
//import Moment from "react-moment";
//import moment from "moment";
import { format } from "date-fns";
import SearchResult from "../components/SearchResult";
import useFetch from "../hooks/useFetch";

const Hotels = () => {
  const location = useLocation();
  //console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  //const [checkInOutDate, setCheckInDate] = useState(location.state.date);
  const [optionData, setOptionData] = useState(location.state.optionData);

  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const handleDateOpen = () => {
    setDateOpen(!dateOpen);
  };

  const { data, loading, reFetch } = useFetch(
    `${
      process.env.REACT_APP_API_URI
    }/hotels?city=${destination.toLowerCase()}&min=${min || 1}&max=${
      max || 1000
    }`
  );

  const handleSubmit = () => {
    reFetch();
  };

  //console.log("data", data);

  //console.log("optionData", optionData);
  //console.log("date", date);
  return (
    <div className="hotelssearchpage">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="hotelsFilter-section">
              <div className="differentSearch">
                <h4>Search</h4>
                <div className="destination searchFields">
                  <label>Destination/Property name</label>
                  <div className="input-section">
                    <span>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input
                      type="text"
                      className="form-control common"
                      placeholder="Enter destination"
                      value={destination}
                      //onChange={(e) => setDestination(e.target.value())}
                    />
                  </div>
                </div>
                <div className="checkinDate searchFields">
                  <label>Checkin date:</label>
                  <div className="input-section">
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </span>
                    <div
                      className="fliterCheck form-control common"
                      onClick={handleDateOpen}
                      style={{ width: "100%" }}
                    >
                      {format(date[0].startDate, "EEEE, MMMM d")}
                    </div>
                  </div>
                  {dateOpen && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="filter-daterange-selection"
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="checkinDate searchFields">
                  <label>CheckOut date:</label>
                  <div className="input-section">
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </span>
                    <div
                      className="fliterCheck form-control common"
                      onClick={handleDateOpen}
                      style={{ width: "100%" }}
                    >
                      {date
                        ? format(date[0].endDate, "EEEE, MMMM d")
                        : format(
                            location.state.date[0].endDate,
                            "EEEE, MMMM d"
                          )}
                    </div>
                  </div>
                  {dateOpen && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="filter-daterange-selection"
                      minDate={new Date()}
                    />
                  )}
                </div>
              </div>
              <div className="differentfilterOptions">
                <h4>Options</h4>
                <div className="filterOption">
                  <label>Min price per night</label>
                  <input
                    type="text"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="filterOption">
                  <label>Max price per night</label>
                  <input
                    type="text"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="filterOption">
                  <label>Adult</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    //value={optionData.adults}
                    // onChange={() => handleChange("adults")}
                  />
                </div>
                <div className="filterOption">
                  <label>Children</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    //value={optionData.childrens}
                    //onChange={() => handleChange("childrens")}
                  />
                </div>
                <div className="filterOption">
                  <label>Room</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    // value={optionData.rooms}
                    //onChange={() => handleChange("rooms")}
                  />
                </div>
              </div>
              <div className="filter-search-button">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {loading
              ? "Loading..."
              : data.map((item) => <SearchResult item={item} key={item._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
