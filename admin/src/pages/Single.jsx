import React, { useState } from "react";
import "../style/single.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChartComponent from "../components/ChartComponent";
import TableComponent from "../components/TableComponent";

const Single = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Header setNavOpen={setNavOpen} />

      <div className="container-fluid">
        <div className="row">
          <Sidebar navOpen={navOpen} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="single">
              <div className="singleContainer">
                <div className="top">
                  <div className="left">
                    <div className="editButton">Edit</div>
                    <h1 className="title">Information</h1>
                    <div className="item">
                      <img
                        src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        className="itemImg"
                      />
                      <div className="details">
                        <h1 className="itemTitle">Jane Doe</h1>
                        <div className="detailItem">
                          <span className="itemKey">Email:</span>
                          <span className="itemValue">janedoe@gmail.com</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Phone:</span>
                          <span className="itemValue">+1 2345 67 89</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Address:</span>
                          <span className="itemValue">
                            Elton St. 234 Garden Yd. NewYork
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Country:</span>
                          <span className="itemValue">USA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <ChartComponent
                      aspect={3 / 1}
                      title="User Spending ( Last 6 Months)"
                    />
                  </div>
                </div>
                <div className="bottom">
                  <h1 className="title">Last Transactions</h1>
                  <TableComponent />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Single;
