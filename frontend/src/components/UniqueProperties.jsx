import React from "react";
import useFetch from "../hooks/useFetch";
import "../style/uniqueProperty.css";

const UniqueProperties = () => {
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/hotels?featured=true&limits=4`
  );

  //console.log("data", data);

  return (
    <div className="uniquePorpertyList">
      {loading
        ? "Loading..."
        : data.map((item) => (
            <div className="uniqueProperty" key={item._id}>
              <div className="uniqueImage">
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/286659200.webp?k=9206fc9239b3e4538c22d04b85213d6d5e6257015022de8a37effd956fcde4b6&o=&s=1"
                  alt="unique"
                />
              </div>
              <div className="unquieTitle">
                <h4>{item.name}</h4>
                <h5>{item.city}</h5>
                <div className="count-review">
                  <span className="rating">8.4</span>
                  <span className="reviw">Very Good</span>
                  <span className="totalReview">86 reviews</span>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default UniqueProperties;
