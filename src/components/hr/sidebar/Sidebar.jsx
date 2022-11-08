import "./sidebar.scss";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PreviewIcon from "@mui/icons-material/Preview";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useContext } from "react";

const Sidebar = () => {
  return (
    <div className="hrSidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            {" "}
            <span className="name">Quick</span> HR
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">EMPLOYEE</p>
          <Link to="/hr/employee/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add</span>
            </li>
          </Link>
          <Link to="/hr/employee/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All</span>
            </li>
          </Link>
          <Link to="/hr/dependent/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add Dependent</span>
            </li>
          </Link>

          <p className="title">OT</p>
          <Link to="/hr/otType/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add OT Type</span>
            </li>
          </Link>
          <Link to="/hr/otType/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All OT Types</span>
            </li>
          </Link>
          <Link to="/hr/otRecord/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add OT Record</span>
            </li>
          </Link>
          <Link to="/hr/otRecord/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All OT Records</span>
            </li>
          </Link>

          <p className="title">ADVANCE PAYMENT</p>
          <Link to="/hr/advance/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Give Advance Payment</span>
            </li>
          </Link>
          <Link to="/hr/advance/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All Advance Payments</span>
            </li>
          </Link>

          <p className="title">SALARY</p>
          <Link to="/hr/salary/calculate" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Calculate Salary</span>
            </li>
          </Link>
          <Link to="/hr/salary/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All Salaries</span>
            </li>
          </Link>

          <p className="title">ATTENDANCE</p>
          <Link to="/hr/attendance/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add Attendance</span>
            </li>
          </Link>
          <Link to="/hr/attendance/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All Attendance</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
