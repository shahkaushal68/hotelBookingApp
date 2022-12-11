import React from "react";
import useFetch from "../hooks/useFetch";
import "../style/featuredProperties.css";

const FeatureProperties = () => {
  const { data } = useFetch(
    `${process.env.REACT_APP_API_URI}/hotels/countByCities?cities=Ahmedabad,Surat,Vadodara`
  );

  //console.log("data", data);

  return (
    <div className="featurePropertis">
      <div className="featured">
        <div className="fImage">
          <img
            src="https://cf.bstatic.com/xdata/images/city/540x270/689874.jpg?k=5a29b0d987e962b9ce2c78ae5dae52d02fb2ed959b1e2b00faf022306e103f8b&o="
            alt="title"
          />
        </div>
        <div className="fTitle">
          <h1>Ahmedabad</h1>
          <h2>{data[0]} Properties</h2>
        </div>
      </div>
      <div className="featured">
        <div className="fImage">
          <img
            src="https://cf.bstatic.com/xdata/images/city/540x270/689874.jpg?k=5a29b0d987e962b9ce2c78ae5dae52d02fb2ed959b1e2b00faf022306e103f8b&o="
            alt="title"
          />
        </div>
        <div className="fTitle">
          <h1>Surat</h1>
          <h2>{data[1]} Properties</h2>
        </div>
      </div>
      <div className="featured">
        <div className="fImage">
          <img
            src="https://cf.bstatic.com/xdata/images/city/540x270/689874.jpg?k=5a29b0d987e962b9ce2c78ae5dae52d02fb2ed959b1e2b00faf022306e103f8b&o="
            alt="title"
          />
        </div>
        <div className="fTitle">
          <h1>Vadodara</h1>
          <h2>{data[2]} Properties</h2>
        </div>
      </div>
    </div>
  );
};

export default FeatureProperties;
