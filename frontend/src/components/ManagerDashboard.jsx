import { useState, useEffect } from "react";
import { getPendingRequestsForManager, reviewLeaveRequest } from "../api/leaveRequestService";

function ManagerDashboard({ managerId, refreshKey, onReviewComplete }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getPendingRequestsForManager(managerId)
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load pending requests");
        setLoading(false);
        console.error(err);
      });
  }, [managerId, refreshKey]);

  const handleReview = (requestId, status) => {
    setActionMessage("");

    reviewLeaveRequest(requestId, {
      status: status,
      reviewComment: status === "APPROVED" ? "Approved" : "Rejected",
    })
      .then(() => {
        setActionMessage(`✓ Request #${requestId} ${status.toLowerCase()}`);
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
        onReviewComplete();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || "Something went wrong";
        setActionMessage(`✗ ${errorMsg}`);
      });
  };

  if (loading) return <p>Loading pending requests...</p>;
  if (error) return <p>{error}</p>;

  if (loading) {
  return (
    <div className="employee-list-container">
      <h2>Pending Leave Requests</h2>
      <div className="state-container">
        <div className="spinner"></div>
        <p>Loading pending requests...</p>
      </div>
    </div>
  );
}

  return (
    <div className="employee-list-container">
      <h2>Pending Leave Requests</h2>

      {actionMessage && (
        <div className={actionMessage.startsWith("✓") ? "message-success" : "message-error"}>
          {actionMessage}
        </div>
      )}

        {requests.length === 0 ? (
        <div className="state-container">
        <div className="empty-icon">✅</div>
        <p>All caught up!</p>
        <p className="empty-subtext">No pending requests need your review</p>
       </div>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.employee.name}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.reason}</td>
                <td>
                  <button className = "btn-approve" onClick={() => handleReview(req.id, "APPROVED")}>
                    Approve
                  </button>
                  <button className = "btn-reject" onClick={() => handleReview(req.id, "REJECTED")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagerDashboard;