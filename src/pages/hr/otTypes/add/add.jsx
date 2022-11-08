import "./add.scss";
import { useState } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const AddOtType = () => {
  const [OtType, setOtType] = useState("");
  const [payPerHour, setPayPerHour] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    if (OtType === "" || payPerHour === 0) {
      alert("Please fill all required fields");
    } else {
      let data = {
        type: OtType,
        payPerHour: payPerHour,
      };

      axios
        .post(
          "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/otType/add",
          data
        )
        .then((res) => {
          if (res.data === "OT type Added") {
            alert("OT type Added");
            setOtType("");
            setPayPerHour("");
          } else {
            alert("Sorry,Try again");
          }
        });
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add OT Type</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>OT Type*</label>
                <input
                  type="text"
                  value={OtType}
                  onChange={(e) => {
                    setOtType(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Pay Per Hour*</label>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={payPerHour}
                  onChange={(e) => {
                    setPayPerHour(e.target.value);
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

export default AddOtType;
