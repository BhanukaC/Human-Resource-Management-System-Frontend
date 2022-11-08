import "./add.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";
import * as XLSX from "xlsx";
import Datatable from "../../../../components/hr/attendanceDisplayTable/Datatable";
import moment from "moment";

const AddAttendance = () => {
  const [data, setData] = useState([]);
  const [EIDList, setEIDList] = useState([]);
  const submitForm = (e) => {
    e.preventDefault();
    if (data.length === 0) {
      alert("Please select a file first");
    } else {
      axios
        .post(
          "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/attendance/add",
          { data: data }
        )
        .then((res) => {
          if (res.data === "Employee attendance added") {
            alert("Employee attendance added");
            window.location.reload();
          } else {
            if (res.data.error.code === "ER_DUP_ENTRY") {
              alert("You trying to add existing data again");
            } else {
              alert("Try again");
            }
          }
        });
    }
  };

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );
    if (
      headers[0] === "EID" &&
      headers[1] === "date" &&
      headers[2] === "inTime" &&
      headers[3] === "outTime"
    ) {
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(
          /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );

        if (row.length !== 0) {
          if (checkEID(row[0])) {
            list.push({
              id: i,
              EID: row[0],
              date: moment(row[1]).format("YYYY/MM/DD"),
              inTime: row[2],
              outTime: row[3],
            });
          }
        }
      }
      setData(list);
    } else {
      alert("Please Check your file");
      window.location.reload();
    }
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const checkEID = (val) => {
    for (let i = 0; i < EIDList.length; i++) {
      if (val == EIDList[i].EID) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/employee/getAllEID"
      )
      .then((res) => {
        setEIDList(res.data);
      });
  }, [""]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add Attendance</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Attendance CSV File</label>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Add Attendance Data</button>
            </form>
          </div>
        </div>
        {data.length !== 0 && (
          <div className="bottomContainer">
            <div className="right">
              <Datatable data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAttendance;
