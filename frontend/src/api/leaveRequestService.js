import api from "./axiosConfig";

export const applyForLeave = (leaveData) =>
  api.post("/leave-requests", leaveData);

export const getAllLeaveRequests = () => api.get("/leave-requests");

export const getLeaveRequestsByEmployee = (employeeId) =>
  api.get(`/leave-requests/employee/${employeeId}`);

export const getPendingRequestsForManager = (managerId) =>
  api.get(`/leave-requests/manager/${managerId}/pending`);

export const reviewLeaveRequest = (requestId, reviewData) =>
  api.put(`/leave-requests/${requestId}/review`, reviewData);
