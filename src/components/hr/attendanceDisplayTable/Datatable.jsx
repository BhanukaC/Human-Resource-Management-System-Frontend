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
  { field: "EID", headerName: "EID" },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  { field: "inTime", headerName: "In Time" },
  { field: "outTime", headerName: "Out Time" },
];

const Datatable = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (Array.isArray(props.data)) {
      let dt = props.data;

      setData(dt);
    }
  }, [props.data]);

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
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
