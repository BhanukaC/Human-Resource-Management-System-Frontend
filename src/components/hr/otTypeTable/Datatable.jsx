import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "otID", headerName: "otID" },
  { field: "type", headerName: "Type", width: 100 },
  { field: "payPerHour", headerName: "Pay Per Hour" },
];

const Datatable = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/otType/getAll"
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.otID,
            ...d,
          };
        });
        setData(dt);
      });
  }, [""]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const reLink = "/hr/otType/edit/" + params.row.otID;
        return (
          <div className="cellAction">
            <Link to={reLink} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All OT Types</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default Datatable;
