import { useState } from "react";
import LeaveApplicationForm from "../components/LeaveApplicationForm";
import MyLeaveRequests from "../components/MyLeaveRequests";

function EmployeePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [employeeId, setEmployeeId] = useState(2); // hardcoded for now, no login yet

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app-main">
      <LeaveApplicationForm onLeaveApplied={handleRefresh} />
      <MyLeaveRequests employeeId={employeeId} refreshKey={refreshKey} />
    </div>
  );
}

export default EmployeePage;