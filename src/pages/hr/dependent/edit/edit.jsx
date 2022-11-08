import "./edit.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const EditDependent = () => {
  const [EID, setEID] = useState("");
  const [dependentName, setDependentName] = useState("");
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setgender] = useState("");

  const { DID } = useParams();
  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/dependent/getSingle/" +
          DID
      )
      .then((res) => {
        setDob(
          moment(res.data[0].DOB).add(1, "days").utc().format("YYYY-MM-DD")
        );
        setEID(res.data[0].EID);
        setDependentName(res.data[0].name);
        setgender(res.data[0].gender);
        setContactNo(res.data[0].contactNo);
        setRelationship(res.data[0].relationship);
      });
  }, [""]);

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
      if (!/^\d{10}$/.test(contactNo)) {
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
          .put(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/dependent/update/" +
              DID,
            data
          )
          .then((res) => {
            if (res.data === "Dependent details Updated") {
              alert("Dependent details Updated");
            } else {
              alert("Sorry,Try again");
            }
          });
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Update Dependent</h1>
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
                  }}
                  disabled
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
              <button onClick={submitForm}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDependent;
