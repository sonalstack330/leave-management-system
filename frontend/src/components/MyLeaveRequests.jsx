import { useState, useEffect } from "react";
import { getLeaveRequestsByEmployee } from "../api/leaveRequestService";

function MyLeaveRequests({ employeeId, refreshKey }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLeaveRequestsByEmployee(employeeId)
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load your leave requests");
        setLoading(false);
      });
  }, [employeeId, refreshKey]);

  if (loading) return <p>Loading your requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="employee-list-container">
      <h2>My Leave Requests</h2>
      {requests.length === 0 ? (
        <p>You haven't applied for any leave yet.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.reason}</td>
                <td>
                  <span className={`status-badge ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyLeaveRequests;
