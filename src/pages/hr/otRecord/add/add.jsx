import "./add.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const AddOtRecord = () => {
  const [EID, setEID] = useState("");
  const [NIC, setNIC] = useState("");
  const [otType, setOtType] = useState("");
  const [hours, setHours] = useState(0);
  const [OtTypes, setOtTypes] = useState({});
  const [EIDStatus, setEIDStatus] = useState(false);

  useEffect(() => {
    const getOtTypes = async () => {
      const res = await axios.get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/otType/getAll"
      );
      setOtTypes(res.data);
    };
    getOtTypes();
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (EID === "" || NIC === "" || otType === "" || hours <= 0) {
      alert("Please fill all required fields");
    } else {
      if (!EIDStatus) {
        alert("EID not Valid");
      } else {
        let data = {
          EID: EID,
          otID: otType,
          hours: hours,
        };

        axios
          .post(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/ot/add",
            data
          )
          .then((res) => {
            console.log(res);
            if (res.data === "OT Added") {
              alert("OT Added");
              setEID("");
              setNIC("");
              setHours(0);
              setOtType("");
            } else {
              alert("Sorry,Try again");
            }
          });
      }
    }
  };

  const checkEmployee = async (val) => {
    if (val !== "") {
      const res = await axios.get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/employee/getSingle/" +
          val
      );
      if (res.data.length === 0) {
        setNIC("");
        alert("EID not found");
        setEIDStatus(false);
      } else {
        setNIC(res.data[0].NIC);
        setEIDStatus(true);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add OT Record</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>EID*</label>
                <input
                  type="text"
                  value={EID}
                  onChange={(e) => {
                    setEID(e.target.value);
                    checkEmployee(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Employee NIC*</label>
                <input
                  type="text"
                  disabled
                  value={NIC}
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>OT Type*</label>

                <select
                  value={otType}
                  onChange={(e) => {
                    setOtType(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select OT Type
                  </option>
                  {Array.isArray(OtTypes)
                    ? OtTypes.map((ot) => (
                        <option value={ot.otID} key={ot.otID}>
                          {ot.type}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="formInput">
                <label>Hours*</label>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={hours}
                  onChange={(e) => {
                    setHours(e.target.value);
                  }}
                />
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOtRecord;
