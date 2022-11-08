import "./calculate.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const CalculateSalary = () => {
  const [today, setToday] = useState("");
  const [nextDay, setNextDay] = useState("");
  const [remainingDays, setRemainingDays] = useState(0);
  const [dd, setDd] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/salary/calculate"
      )
      .then((res) => {
        console.log(res);
        if (res.data === "Salary calculated") {
          alert("Salary calculated");
        } else if (res.data === "Can not calculate salry til 25th") {
          alert("Can not calculate salry til 25th");
        } else if (res.data === "Already calculated salary for this month") {
          alert("Salary already calculated salary for this month");
        } else {
          alert("try again!");
        }
      });
  };

  useEffect(() => {
    var td = new Date();
    var dd = String(td.getDate()).padStart(2, "0");
    var mm = String(td.getMonth() + 1).padStart(2, "0");
    var yyyy = td.getFullYear();
    setDd(dd);

    setToday(yyyy + "/" + mm + "/" + dd);
    if (dd <= 25) {
      setNextDay(yyyy + "/" + mm + "/" + 25);
      setRemainingDays(25 - parseInt(dd));
    } else {
      if (mm !== 12) {
        setNextDay(yyyy + "/" + (parseInt(mm) + 1) + "/" + 25);
        setRemainingDays(25 + (30 - parseInt(dd)));
      } else {
        setNextDay(parseInt(yyyy) + 1 + "/" + "01" + "/" + 25);
        setRemainingDays(25 + (30 - parseInt(dd)));
      }
    }
  }, [""]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Calculate Salary</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Today Date</label>
                <input type="text" value={today} disabled />
              </div>
              <div className="formInput">
                <label>Next Salary Calculating Date</label>
                <input type="text" disabled value={nextDay} />
              </div>
              <div className="formInput">
                <label>Remaining Days</label>
                <input type="text" disabled value={remainingDays} />
              </div>

              <div className="break"></div>
              {dd >= 25 && (
                <button onClick={submitForm}>
                  Calculate Salary for this Month
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateSalary;
