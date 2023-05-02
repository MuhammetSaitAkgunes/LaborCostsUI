import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPersonelForm from "./screens/Personel/AddPersonel";
import AddShiftForm from "./screens/Shift/AddShift";
import { Nav, NavItem, NavLink } from "reactstrap";
import AddProjectForm from "./screens/Project/AddProject";
import AddJobForm from "./screens/Job/AddJob";
import AddWorkingHourForm from "./screens/WorkingHour/AddWorkingHour";
import AddDowntimeForm from "./screens/Downtime/AddDowntime";
import ReportScreen from "./screens/Report/ReportScreen";

function App() {
  return (
    <div>
      <Nav justified tabs>
        <NavItem>
          <NavLink href="/addPersonelForm">Personel Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addShiftForm">Mesai Türü Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addProjectForm">Proje Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addJobForm">İş Tanımı Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addDowntimeForm">Duraksama Detayı Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addWorkingHourForm">Çalışma Detayı Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/reportScreen">Raporlar</NavLink>
        </NavItem>
      </Nav>

      <Routes>
        <Route path="/addProjectForm" element={<AddProjectForm />} />
        <Route path="/addPersonelForm" element={<AddPersonelForm />} />
        <Route path="/addShiftForm" element={<AddShiftForm />} />
        <Route path="/addJobForm" element={<AddJobForm />} />
        <Route path="/addWorkingHourForm" element={<AddWorkingHourForm />} />
        <Route path="/addDowntimeForm" element={<AddDowntimeForm />} />
        <Route path="/reportScreen" element={<ReportScreen />} />
      </Routes>
    </div>
  );
}

export default App;
