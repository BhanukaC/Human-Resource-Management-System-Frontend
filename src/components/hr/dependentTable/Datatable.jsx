import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "DID", headerName: "DID" },
  { field: "name", headerName: "Name" },
  { field: "contactNo", headerName: "contact No", width: 120 },
  { field: "birth", headerName: "Date of Birth", width: 100 },
  { field: "gender", headerName: "Gender" },
  { field: "relationship", headerName: "Relationship" },
];

const Datatable = (props) => {
  const EID = props.EID;
  const [data, setData] = useState({});

  // const handleDelete = (CID) => {
  //   setData(data.filter((item) => item.id !== CID));
  // };

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/dependent/getAll/" +
          EID
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return {
            id: d.DID,
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
      width: 100,
      renderCell: (params) => {
        const reLink = "/hr/dependent/edit/" + params.row.DID;
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
        <h1>All Dependents For Employee(EID-{EID})</h1>
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
