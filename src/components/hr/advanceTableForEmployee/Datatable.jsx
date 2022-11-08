import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "adID", headerName: "adID" },
  { field: "UID", headerName: "UID" },
  { field: "amount", headerName: "amount" },
  { field: "modifiedDate", headerName: "Date" },
];

const Datatable = (params) => {
  const [data, setData] = useState({});
  const EID = params.EID;

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/advance/getAllForEmployee/" +
          EID
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.adID,
            modifiedDate: moment(d.Date)
              .add(1, "days")
              .utc()
              .format("YYYY/MM/DD"),
            ...d,
          };
        });
        setData(dt);
        // console.log(dt);
      });
  }, [""]);

  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Advance Records for Employee(EID-{EID})</h1>
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
