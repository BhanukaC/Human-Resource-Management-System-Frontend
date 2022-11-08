import "./viewAll.scss";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import Datatable from "../../../../components/hr/otRecordTable/Datatable";

const ViewAllOtRecords = () => {
  //console.log(EID);
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

export default ViewAllOtRecords;
