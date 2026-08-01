import { useState } from "react";
import ManagerDashboard from "../components/ManagerDashboard";

function ManagerPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ManagerDashboard
      managerId={1}
      refreshKey={refreshKey}
      onReviewComplete={handleRefresh}
    />
  );
}

export default ManagerPage;