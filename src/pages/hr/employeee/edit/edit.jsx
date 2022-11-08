import "./edit.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const EditEmployee = () => {
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [NIC, setNIC] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [gender, setgender] = useState("");
  const [workerType, setWorkerType] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [basicSalary, setBasicSalary] = useState(0);
  const [dailyWage, setDailyWage] = useState(0);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");

  const { EID } = useParams();
  console.log(EID);

  useEffect(() => {
    axios
      .get(
        "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/employee/getSingle/" +
          EID
      )
      .then((res) => {
        setDob(
          moment(res.data[0].DOB).add(1, "days").utc().format("YYYY-MM-DD")
        );

        setFname(res.data[0].fName);
        setLname(res.data[0].lName);
        setBankName(res.data[0].bankName);
        setAccountNo(res.data[0].accountNo);
        setBranchCode(res.data[0].branchCode);
        setBranchName(res.data[0].branchName);
        setNIC(res.data[0].NIC);
        setPassportNo(res.data[0].passportNo);
        setgender(res.data[0].gender);
        if (res.data[0].basicSalary > 0) {
          setWorkerType("0");
        } else {
          setWorkerType("1");
        }
        setDesignation(res.data[0].designation);
        setDepartment(res.data[0].department);
        setBasicSalary(res.data[0].basicSalary);
        setDailyWage(res.data[0].dailyWage);
        setEmail(res.data[0].email);
        setMobile(res.data[0].contactNumber);
        setNo(res.data[0].no);
        setStreet(res.data[0].street);
        setTown(res.data[0].town);
      });
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (
      dob === "" ||
      fname === "" ||
      lname === "" ||
      bankName === "" ||
      accountNo === "" ||
      accountNo === "" ||
      branchCode === "" ||
      NIC === "" ||
      gender === "" ||
      designation === "" ||
      department === "" ||
      workerType === "" ||
      email === "" ||
      mobile === "" ||
      no === "" ||
      street === "" ||
      town === "" ||
      (basicSalary === 0 && dailyWage === 0)
    ) {
      alert("Please fill all required fields");
    } else {
      if (!/^\d{10}$/.test(mobile)) {
        alert("Invalid Mobile number, must be ten digits !");
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("You have entered an invalid email address!");
      } else if (NIC.length !== 10) {
        alert("Please Enter a valid NIC Number !");
      } else {
        let data = {
          DOB: dob,
          fName: fname,
          lName: lname,
          bankName: bankName,
          accountNo: accountNo,
          branchCode: branchCode,
          branchName: branchName,
          NIC: NIC,
          gender: gender,
          designation: designation,
          department: department,
          email: email,
          contactNumber: mobile,
          no: no,
          street: street,
          town: town,
        };

        if (workerType === "0") {
          data = { basicSalary: basicSalary, ...data };
        }
        if (workerType === "1") {
          data = { dailyWage: dailyWage, ...data };
        }

        if (passportNo !== "") {
          data = { passportNo: passportNo, ...data };
        }

        axios
          .put(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/hr/employee/update/" +
              EID,
            data
          )
          .then((res) => {
            if (res.data === "Employee details Updated") {
              alert("Employee details Updated");
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
          <h1>Update Employee</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>First Name*</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Last Name*</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
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
                <label>Bank Name*</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Account Number*</label>
                <input
                  type="number"
                  value={accountNo}
                  onChange={(e) => {
                    setAccountNo(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Branch Name*</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => {
                    setBranchName(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Branch Code*</label>
                <input
                  type="number"
                  value={branchCode}
                  onChange={(e) => {
                    setBranchCode(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>NIC Number*</label>
                <input
                  type="text"
                  value={NIC}
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Passport Number</label>
                <input
                  type="text"
                  value={passportNo}
                  onChange={(e) => {
                    setPassportNo(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Mobile Number*</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Address Line 1(No)*</label>
                <input
                  type="text"
                  value={no}
                  onChange={(e) => {
                    setNo(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Address Line 2(street)*</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Address Line 3(Town)*</label>
                <input
                  type="text"
                  value={town}
                  onChange={(e) => {
                    setTown(e.target.value);
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

              <div className="formInput">
                <label>Select worker Type*</label>

                <select
                  value={workerType}
                  onChange={(e) => {
                    setWorkerType(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select Worker Type
                  </option>
                  <option value="0">Shop and Office</option>
                  <option value="1">Daily Wage</option>
                </select>
              </div>

              {workerType === "0" ? (
                <div className="formInput">
                  <label>Basic Salary*</label>
                  <input
                    type="text"
                    value={basicSalary}
                    onChange={(e) => {
                      setBasicSalary(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {workerType === "1" ? (
                <div className="formInput">
                  <label>Daily Wage*</label>
                  <input
                    type="text"
                    value={dailyWage}
                    onChange={(e) => {
                      setDailyWage(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="formInput">
                <label>Department*</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Designation*</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                />
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

export default EditEmployee;
