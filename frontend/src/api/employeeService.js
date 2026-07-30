import api from "./axiosConfig";

export const getAllEmployees = () => api.get("/employees");

export const getEmployeeById = (id) => api.get(`/employees/${id}`);

export const getEmployeesByManager = (managerId) =>
  api.get(`/employees/manager/${managerId}`);

export const createEmployee = (employeeData) =>
  api.post("/employees", employeeData);