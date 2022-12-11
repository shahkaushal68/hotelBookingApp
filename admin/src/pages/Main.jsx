import React from "react";
import "../style/main.scss";

import Featured from "../components/Featured";
import Widgets from "../components/Widgets";
import ChartComponent from "../components/ChartComponent";
import TableComponent from "../components/TableComponent";

const Main = () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <div className="widgets">
        <Widgets type="user" />
        <Widgets type="order" />
        <Widgets type="earning" />
        <Widgets type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <ChartComponent aspect={2 / 1} title="Last 6 months (Revenue)" />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <TableComponent />
      </div>
    </>
  );
};

export default Main;
