import { useState } from "react";
import { applyForLeave } from "../api/leaveRequestService";

function LeaveApplicationForm() {
  const [formData, setFormData] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    applyForLeave(formData)
      .then((response) => {
        setMessage(`✓ Success! Request ID: ${response.data.id}`);
        setFormData({ employeeId: "", startDate: "", endDate: "", reason: "" });
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || "Error";
        setMessage(`✗ ${errorMsg}`);
      });
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2>📝 Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Employee ID:</label>
          <input
            type="number"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#667eea",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Apply
        </button>
      </form>
      {message && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: message.includes("✓") ? "#d4edda" : "#f8d7da",
            color: message.includes("✓") ? "#155724" : "#721c24",
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default LeaveApplicationForm;