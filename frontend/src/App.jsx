import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import LeaveApplicationForm from "./components/LeaveApplicationForm";
import ManagerDashboard from "./components/ManagerDashboard";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLeaveApplied = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Leave Management System</h1>
        <p className="tagline">Apply for leave and track your team's requests</p>
      </header>
      <main className="app-main">
        <LeaveApplicationForm onLeaveApplied={handleLeaveApplied} />
        <EmployeeList refreshKey={refreshKey} />
      </main>
       <ManagerDashboard
        managerId={1}
        refreshKey={refreshKey}
        onReviewComplete={handleLeaveApplied}
      />
    </div>
  );
}

export default App;