import "./viewAll.scss";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import Datatable from "../../../../components/hr/employeeTable/Datatable";

const ViewAllEmployees = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default ViewAllEmployees;
