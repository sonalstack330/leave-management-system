import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1>Leave Management System</h1>
          <p className="tagline">Apply for leave and track your team's requests</p>
        </header>

        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            My Leave
          </NavLink>
          <NavLink to="/manager" className={({ isActive }) => (isActive ? "active" : "")}>
            Manager Dashboard
          </NavLink>
          <NavLink to="/employees" className={({ isActive }) => (isActive ? "active" : "")}>
            Employee Directory
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/employees" element={<EmployeeDirectoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;