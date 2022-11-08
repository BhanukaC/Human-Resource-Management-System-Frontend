import "./add.scss";
import { useState } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const AddDependent = () => {
  const [EID, setEID] = useState("");
  const [NIC, setNIC] = useState("");
  const [dependentName, setDependentName] = useState("");
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setgender] = useState("");
  const [EIDStatus, setEIDStatus] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (
      EID === "" ||
      dependentName === "" ||
      dob === "" ||
      contactNo === "" ||
      relationship === "" ||
      gender === ""
    ) {
      alert("Please fill all required fields");
    } else {
      if (!EIDStatus) {
        alert("EID not Valid");
      } else if (!/^\d{10}$/.test(contactNo)) {
        alert("Invalid Contact number, must be ten digits !");
      } else {
        let data = {
          EID: EID,
          name: dependentName,
          contactNo: contactNo,
          DOB: dob,
          gender: gender,
          relationship: relationship,
        };

        axios
          .post(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/dependent/add",
            data
          )
          .then((res) => {
            if (res.data === "Dependent Added") {
              alert("Dependent Added");
              setEID("");
              setNIC("");
              setDependentName("");
              setDob("");
              setContactNo("");
              setgender("");
              setRelationship("");
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
          <h1>Add Dependent</h1>
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
                <label>Dependent Name*</label>
                <input
                  type="text"
                  value={dependentName}
                  onChange={(e) => {
                    setDependentName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Date of Birth*</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Contact Number*</label>
                <input
                  type="text"
                  value={contactNo}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Relationship*</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => {
                    setRelationship(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Gender*</label>

                <select
                  value={gender}
                  onChange={(e) => {
                    setgender(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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

export default AddDependent;
