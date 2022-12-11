import React from "react";
import useFetch from "../hooks/useFetch";
import "../style/browseProperty.css";

const BrowseProperties = () => {
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/hotels/countByTypes`
  );

  const images = [
    "https://cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    "https://cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    "https://cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    "https://cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    "https://cf.bstatic.com/xdata/images/region/square250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
  ];

  //console.log("data", data);
  //console.log("images", images);

  return (
    <div className="browseByPropertyList">
      {loading
        ? "Loading..."
        : data &&
          images.map((img, i) => (
            <div className="brosweProperty" key={i}>
              <div className="brosweImage">
                <img src={img} alt="goa" />
              </div>
              <div className="browseTitle">
                <h4>{data[i]?.type}</h4>
                <h5>
                  {data[i]?.count} {data[i]?.type}
                </h5>
              </div>
            </div>
          ))}
    </div>
  );
};

export default BrowseProperties;
