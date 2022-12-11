import React, { useState } from "react";
import DataTableComponent from "../components/DataTableComponent";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const List = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Header setNavOpen={setNavOpen} />

      <div className="container-fluid">
        <div className="row">
          <Sidebar navOpen={navOpen} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <DataTableComponent />
          </main>
        </div>
      </div>
    </>
  );
};

export default List;
