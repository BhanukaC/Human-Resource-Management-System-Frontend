import "./profile.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import HRSidebar from "../../components/hr/sidebar/Sidebar";
import axios from "axios";
import user from "../../auth";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      alert(
        "If you need to change password fill 'Current Password' , 'New Password' and 'Confirm New Password'"
      );
    } else {
      if (newPassword !== confirmPassword) {
        alert("'New Password' and 'Confirm New Password' must match");
      } else {
        axios
          .post(
            "http://hr-load-balancer-1578829864.us-east-1.elb.amazonaws.com/auth/changePassword",
            {
              oldPassword: currentPassword,
              newPassword: newPassword,
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data === "Password changed") {
              alert("Password changed");
              window.location.reload();
            } else {
              if (res.data.error === "Wrong password") {
                alert("Recheck your current password");
              } else {
                alert("Sorry,Try again");
              }
            }
          });
      }
    }
  };

  return (
    <div className="new">
      <HRSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Profile</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>UID</label>
                <input type="text" value={user.id} disabled />
              </div>
              <div className="formInput">
                <label>User Name</label>
                <input type="text" disabled value={user.username} />
              </div>

              <div className="formInput">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="break"></div>
              {newPassword !== "" &&
                currentPassword !== "" &&
                confirmPassword !== "" && (
                  <button onClick={submitForm}>Change Password</button>
                )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
