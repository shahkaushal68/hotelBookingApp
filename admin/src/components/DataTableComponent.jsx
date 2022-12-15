import React, { useState, useEffect, useContext } from "react";
//import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "../style/dataTableComponent.scss";
import { userColumns, hotelColumns } from "../dataTableSrc";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { auth } from "../context/AuthContext";

const DataTableComponent = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const {
    state: { user },
  } = useContext(auth);

  let columns;
  if (path === "users") {
    columns = userColumns;
  }
  if (path === "hotels") {
    columns = hotelColumns;
  }

  const { data } = useFetch(`${process.env.REACT_APP_API_URI}/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  //console.log("list", list);
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URI}/${path}/${id}`, {
      headers: { Authorization: "Bearer " + user.token },
    });
    setList(list.filter((item) => item._id !== id));
  };

  //console.log("data", data);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${path}/test`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span style={{ textTransform: "capitalize" }}>{`Add New ${path}`}</span>
        <Link to={`${location.pathname}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataTableComponent;
