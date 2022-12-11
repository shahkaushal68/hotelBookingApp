import React from "react";
import BrowseProperties from "../components/BrowseProperties";
import FeatureProperties from "../components/FeatureProperties";
import Footer from "../components/Footer";
import SubScribe from "../components/SubScribe";
import UniqueProperties from "../components/UniqueProperties";
import "../style/home.css";

const Home = () => {
  return (
    <div className="homepage">
      <div className="container">
        <FeatureProperties />
        <div className="brwoseByProperty">
          <h2>Browse By Property Type</h2>
          <BrowseProperties />
        </div>
        <div className="uniqueProperty">
          <h2>Stay at our top unique properties</h2>
          <UniqueProperties />
        </div>
      </div>
      <div className="subscribeSection">
        <div className="container">
          <SubScribe />
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
