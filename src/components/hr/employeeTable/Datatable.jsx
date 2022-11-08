import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "EID", headerName: "EID" },
  { field: "birth", headerName: "Date of Birth", width: 100 },
  { field: "fName", headerName: "First Name" },
  { field: "lName", headerName: "Last Name" },
  { field: "bankName", headerName: "Bank Namee", width: 100 },
  { field: "accountNo", headerName: "Account No" },
  { field: "branchCode", headerName: "Branch Code" },
  { field: "branchName", headerName: "Branch Name" },
  { field: "NIC", headerName: "NIC", width: 130 },
  { field: "passportNo", headerName: "Passport No", width: 130 },
  { field: "gender", headerName: "Gender" },
  { field: "designation", headerName: "Designation" },
  { field: "department", headerName: "Department" },
  { field: "basicSalary", headerName: "Basic Salary" },
  { field: "dailyWage", headerName: "Daily Wage" },
  { field: "contactNumber", headerName: "contact Number", width: 120 },
  { field: "email", headerName: "Email", width: 170 },
  { field: "no", headerName: "No" },
  { field: "street", headerName: "Street" },
  { field: "town", headerName: "Town" },
];

const salaryButton = [
  {
    field: "ViewSalaries",
    headerName: "",
    renderCell: getViewSalaryButton,
    width: 150,
  },
];
function getViewSalaryButton(params) {
  const reLink5 = "/hr/salary/viewall/" + params.row.EID;
  if (params.row.dailyWage === null) {
    return (
      <div className="cellAction">
        <Link to={reLink5} style={{ textDecoration: "none" }}>
          <div className="viewButton">View All Salaries</div>
        </Link>
      </div>
    );
  }
}

const Datatable = () => {
  const [data, setData] = useState({});

  // const handleDelete = (CID) => {
  //   setData(data.filter((item) => item.id !== CID));
  // };

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/employee/getAll"
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.EID,
            birth: moment(d.DOB).add(1, "days").utc().format("YYYY/MM/DD"),
            ...d,
          };
        });
        setData(dt);
        // console.log(dt);
      });
  }, [""]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 710,
      renderCell: (params) => {
        const reLink = "/hr/employee/edit/" + params.row.EID;
        const reLink2 = "/hr/dependent/viewall/" + params.row.EID;
        const reLink3 = "/hr/OtRecord/viewall/" + params.row.EID;
        const reLink4 = "/hr/advance/viewall/" + params.row.EID;
        const reLink5 = "/hr/attendance/viewall/" + params.row.EID;

        return (
          <div className="cellAction">
            <Link to={reLink} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <Link to={reLink2} style={{ textDecoration: "none" }}>
              <div className="viewButton">View Dependents</div>
            </Link>
            <Link to={reLink3} style={{ textDecoration: "none" }}>
              <div className="viewButton">View OT Records</div>
            </Link>
            <Link to={reLink4} style={{ textDecoration: "none" }}>
              <div className="viewButton">View Advance Records</div>
            </Link>
            <Link to={reLink5} style={{ textDecoration: "none" }}>
              <div className="viewButton">View All Attenace Records</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>All Employees</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn).concat(salaryButton)}
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
