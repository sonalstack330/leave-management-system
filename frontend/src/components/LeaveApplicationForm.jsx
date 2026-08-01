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

        setFormData({
          employeeId: "",
          startDate: "",
          endDate: "",
          reason: "",
        });
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || "Something went wrong.";
        setMessage(`✗ ${errorMsg}`);
      });
  };

  return (
    <div className="form-container">
      <h2>Apply for Leave</h2>

      <p className="form-subtitle">
        Fill in the details below to submit a leave request.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID *</label>

          <input
            type="number"
            name="employeeId"
            placeholder="Enter Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date *</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date *</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reason for Leave</label>

          <textarea
            name="reason"
            placeholder="Briefly describe the reason for your leave..."
            value={formData.reason}
            onChange={handleChange}
            rows={4}
          />
        </div>  

        <button type="submit" className="btn-submit">
          Apply Leave
        </button>
      </form>

      {message && (
        <div
          className={`message ${
            message.startsWith("✓")
              ? "message-success"
              : "message-error"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default LeaveApplicationForm;