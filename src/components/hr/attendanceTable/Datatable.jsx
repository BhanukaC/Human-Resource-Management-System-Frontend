import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
function getFullName(params) {
  return `${params.row.fName || ""} ${params.row.lName || ""}`;
}
const userColumns = [
  { field: "AID", headerName: "SID" },
  { field: "EID", headerName: "EID" },
  { field: "name", headerName: "Name", valueGetter: getFullName, width: 150 },
  {
    field: "formatDate",
    headerName: "Date",
  },
  { field: "inTime", headerName: "In Time" },
  { field: "outTime", headerName: "Out Time" },
];

const Datatable = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/attendance/getAll"
      )
      .then((res) => {
        let dt = res.data.map((d) => {
          return {
            id: d.AID,
            formatDate: moment(d.date)
              .add(1, "days")
              .utc()
              .format("YYYY/MM/DD"),
            ...d,
          };
        });
        setData(dt);
      });
  }, [""]);

  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Attendance</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
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
