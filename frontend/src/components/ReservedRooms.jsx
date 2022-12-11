import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { search } from "../context/SearchContext";
import useFetch from "../hooks/useFetch";

import "../style/reservedRooms.css";

const ReservedRooms = ({ hotelId }) => {
  const [checkData, setCheckData] = useState([]);
  const {
    state: { dates },
  } = useContext(search);

  const { data } = useFetch(
    `${process.env.REACT_APP_API_URI}/hotels/rooms/${hotelId}`
  );

  const checkValue = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckData([...checkData, value]);
    } else {
      setCheckData(checkData.filter((e) => e !== value));
    }
  };

  const getDatesRange = (start, end) => {
    const selectDate = new Date(start);
    let list = [];

    while (selectDate <= end) {
      list.push(new Date(selectDate).getTime());
      selectDate.setDate(selectDate.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleClick = () => {};

  console.log(dates);

  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Select Your rooms</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            {data.length ? (
              data.map((room) => (
                <div className="room-details">
                  <div className="rDescription">
                    <h4 className="rTitle">{room.title}</h4>
                    <p className="rType">{room.description}</p>
                    <p className="rPeople">
                      Max People: <b>{room.maxPeople}</b>
                    </p>
                    <p className="rPrice">
                      <b>{room.price}</b>
                    </p>
                  </div>
                  <div className="rSelect">
                    {room.roomNumbers.map((roomNum) => (
                      <div
                        className="form-check form-check-inline"
                        key={roomNum._id}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={checkValue}
                          value={roomNum._id}
                          disabled={!isAvailable(roomNum)}
                        />
                        <label className="form-check-label">
                          {roomNum.number}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <b>No Room found!</b>
            )}
            <div className="submit-button">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservedRooms;
