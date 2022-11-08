import "./add.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const AddAdvance = () => {
  const [EID, setEID] = useState("");
  const [NIC, setNIC] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [color, setColor] = useState("");
  const [EIDStatus, setEIDStatus] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (EID === "" || amount === 0) {
      alert("Please fill all required fields");
    } else {
      if (!EIDStatus) {
        alert("EID not Valid");
      } else if (balance < amount) {
        alert("Amount is too large");
      } else {
        let data = {
          EID: EID,
          amount: amount,
        };

        axios
          .post(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/advance/add",
            data
          )
          .then((res) => {
            console.log(res);
            if (res.data === "Give an advance") {
              alert("Give an advance");
              setEID("");
              setNIC("");
              setBalance(0);
              setAmount(0);
              setColor("");
              setEIDStatus(false);
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
        alert("EID not found");
        setNIC("");
        setBalance(0);
        setEIDStatus(false);
      } else {
        setNIC(res.data[0].NIC);
        checkBalance(val);
        setEIDStatus(true);
      }
    }
  };

  const checkBalance = async (EID) => {
    const res = await axios.get(
      "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/advance/balance/" +
        EID
    );
    if (res !== undefined) {
      setBalance(res.data.amount);
      if (res.data.amount <= 1000) {
        setColor("red");
      } else {
        setColor("yellow");
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Give Advance</h1>
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
                <label>Employee Remaning Balance*</label>
                <input
                  type="text"
                  disabled
                  value={balance}
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                  style={{ backgroundColor: color }}
                />
              </div>

              <div className="formInput">
                <label>Amount*</label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  min={0}
                  onChange={(e) => {
                    setAmount(e.target.value);
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

export default AddAdvance;
