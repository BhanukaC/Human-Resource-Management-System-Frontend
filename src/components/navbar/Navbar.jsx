import "./navbar.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
          <ul>
            <Link to="/profile" style={{ textDecoration: "none" }}>
            <li className="tooltip1">
              <AccountCircleOutlinedIcon className="icon" />
              <span class="tooltiptext1">Profile</span>
            </li>  
          </Link>

          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li className="tooltip2">
              <ExitToAppIcon className="icon" />
              <span class="tooltiptext2">Logout</span>
            </li>
          </Link>
          </ul> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
