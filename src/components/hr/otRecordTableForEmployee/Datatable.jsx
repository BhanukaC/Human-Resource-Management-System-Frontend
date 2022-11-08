import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "OID", headerName: "OID" },
  { field: "hours", headerName: "Hours" },
  { field: "otID", headerName: "otID" },
  { field: "payPerHour", headerName: "Pay Per Hour" },
  { field: "total", headerName: "Total" },
  { field: "modifiedDate", headerName: "Date" },
];

const Datatable = (props) => {
  const [data, setData] = useState({});
  const EID = props.EID;

  // const handleDelete = (CID) => {
  //   setData(data.filter((item) => item.id !== CID));
  // };

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/ot/getAllForEmployee/" +
          EID
      )
      .then((res) => {
        console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.OID,
            modifiedDate: moment(d.date)
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
    <div className="datatable">
      <div className="dataTableTitle1">
        <h1>All OT Records For Employee(EID-{EID})</h1>
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
