import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "SID", headerName: "SID" },
  { field: "EID", headerName: "EID" },
  { field: "month", headerName: "Month" },
  { field: "year", headerName: "Year" },
  { field: "basicSalary", headerName: "Basic Salary" },
  { field: "addInsentiive", headerName: "Add Insentiive", width: 120 },
  { field: "dataAllowance", headerName: "Data Allowance", width: 120 },
  {
    field: "travellingAllowance",
    headerName: "Travelling Allowance",
    width: 150,
  },
  {
    field: "consolidatedSalary",
    headerName: "Consolidated Salary",
    width: 150,
  },
  { field: "EPF", headerName: "EPF From Employee", width: 142 },
  { field: "ETF", headerName: "ETF" },
  { field: "totOT", headerName: "Total OT" },
  { field: "totAdvance", headerName: "Total Advance", width: 120 },
  { field: "tax", headerName: "Tax" },
  { field: "netSalary", headerName: "Net Salary" },
  { field: "EPFCompany", headerName: "EPF From Company", width: 150 },
];

const Datatable = (props) => {
  const [data, setData] = useState({});
  const EID = props.EID;

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/salary/getAllForEmployee/" +
          EID
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.SID,
            ...d,
          };
        });
        setData(dt);
      });
  }, [""]);

  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Salaries For Employee(EID-{EID})</h1>
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
