import Login from "./pages/login/Login";
import AddEmployee from "./pages/hr/employeee/add/add"
import ViewAllEmployees from "./pages/hr/employeee/viewAll/viewAll";
import EditEmployee from "./pages/hr/employeee/edit/edit";
import AddDependent from "./pages/hr/dependent/add/add";
import ViewAllDependents from "./pages/hr/dependent/viewAll/viewAll";
import EditDependent from "./pages/hr/dependent/edit/edit";
import AddOtType from "./pages/hr/otTypes/add/add";
import ViewAllOtTypes from "./pages/hr/otTypes/viewAll/viewAll";
import EditOtType from "./pages/hr/otTypes/edit/edit";
import AddOtRecord from "./pages/hr/otRecord/add/add";
import ViewAllOtRecords from "./pages/hr/otRecord/viewAll/viewAll";
import ViewAllOtRecordForEmployee from "./pages/hr/otRecord/viewAllForEmployee/viewAll";
import AddAdvance from "./pages/hr/advance/add/add";
import ViewAllAdvance from "./pages/hr/advance/viewAll/viewAll";
import ViewAllAdvanceForEmployee from "./pages/hr/advance/viewAllForEmployee/viewAll";
import CalculateSalary from "./pages/hr/salary/calculate/calculate";
import ViewAllSalaries from "./pages/hr/salary/viewAll/viewAll";
import ViewAllSalariesForEmployee from "./pages/hr/salary/viewAllForEmployee/viewAll";
import AddAttendance from "./pages/hr/attendance/add/add";
import ViewAllAttendance from "./pages/hr/attendance/viewAll/viewAll";
import ViewAllAttendanceForEmployee from "./pages/hr/attendance/viewAllForEmployee/viewAll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteUser from "./components/ProtectedRoute/ProtectedRouteUser";
import LogOut from "./pages/logout/logout";
import Profile from "./pages/profile/profile";



function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="profile" element={<ProtectedRouteUser><Profile /></ProtectedRouteUser>} />

            <Route path="hr">
              <Route index element={<ProtectedRoute level={2}><AddEmployee /></ProtectedRoute>} />
              <Route path="employee">
                <Route path="add" element={<ProtectedRoute level={2}><AddEmployee /></ProtectedRoute>} />
                <Route path="viewall" element={<ProtectedRoute level={2}><ViewAllEmployees /></ProtectedRoute>} />
                <Route path="edit/:EID" element={<ProtectedRoute level={2}><EditEmployee /></ProtectedRoute>} />
              </Route>
              <Route path="dependent">
                <Route path="add" element={<ProtectedRoute level={2}><AddDependent /></ProtectedRoute>} />
                <Route path="viewall/:EID" element={<ProtectedRoute level={2}><ViewAllDependents /></ProtectedRoute>} />
                <Route path="edit/:DID" element={<ProtectedRoute level={2}><EditDependent /></ProtectedRoute>} />
              </Route>
              <Route path="otType">
                <Route path="add" element={<ProtectedRoute level={2}><AddOtType /></ProtectedRoute>} />
                <Route path="viewall/" element={<ProtectedRoute level={2}><ViewAllOtTypes /></ProtectedRoute>} />
                <Route path="edit/:otID" element={<ProtectedRoute level={2}><EditOtType /></ProtectedRoute>} />
              </Route>
              <Route path="otRecord">
                <Route path="add" element={<ProtectedRoute level={2}><AddOtRecord /></ProtectedRoute>} />
                <Route path="viewall/" element={<ProtectedRoute level={2}><ViewAllOtRecords /></ProtectedRoute>} />
                <Route path="viewall/:EID" element={<ProtectedRoute level={2}><ViewAllOtRecordForEmployee /></ProtectedRoute>} />
              </Route>
              <Route path="advance">
                <Route path="add" element={<ProtectedRoute level={2}><AddAdvance /></ProtectedRoute>} />
                <Route path="viewall/" element={<ProtectedRoute level={2}><ViewAllAdvance /></ProtectedRoute>} />
                <Route path="viewall/:EID" element={<ProtectedRoute level={2}><ViewAllAdvanceForEmployee /></ProtectedRoute>} />
              </Route>
              <Route path="salary">
                <Route path="calculate" element={<ProtectedRoute level={2}>< CalculateSalary /></ProtectedRoute>} />
                <Route path="viewall/" element={<ProtectedRoute level={2}><ViewAllSalaries /></ProtectedRoute>} />
                <Route path="viewall/:EID" element={<ProtectedRoute level={2}>< ViewAllSalariesForEmployee /></ProtectedRoute>} />
              </Route>
              <Route path="attendance">
                <Route path="add" element={<ProtectedRoute level={2}>< AddAttendance /></ProtectedRoute>} />
                <Route path="viewall/" element={<ProtectedRoute level={2}><ViewAllAttendance /></ProtectedRoute>} />
                <Route path="viewall/:EID" element={<ProtectedRoute level={2}>< ViewAllAttendanceForEmployee /></ProtectedRoute>} />
              </Route>
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
