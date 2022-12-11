import React from "react";
import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "./Main";

const Home = () => {
  const [navOpen, setNavOpen] = useState(false);

  //console.log(navOpen);

  return (
    <>
      <Header setNavOpen={setNavOpen} />

      <div className="container-fluid">
        <div className="row">
          <Sidebar navOpen={navOpen} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Main />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
