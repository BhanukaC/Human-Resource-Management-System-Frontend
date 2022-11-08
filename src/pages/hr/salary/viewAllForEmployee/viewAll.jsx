import "./viewAll.scss";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import Datatable from "../../../../components/hr/salariesForEmployeeTable/Datatable";
import { useParams } from "react-router-dom";

const ViewAllSalariesForEmployee = () => {
  const { EID } = useParams();
  // console.log(EID);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable EID={EID} />
      </div>
    </div>
  );
};

export default ViewAllSalariesForEmployee;
