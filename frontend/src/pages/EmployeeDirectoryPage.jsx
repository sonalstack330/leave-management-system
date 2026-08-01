import { useState } from "react";
import EmployeeList from "../components/EmployeeList";

function EmployeeDirectoryPage() {
  const [refreshKey] = useState(0);
  return <EmployeeList refreshKey={refreshKey} />;
}

export default EmployeeDirectoryPage;