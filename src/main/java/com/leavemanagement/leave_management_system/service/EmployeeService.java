package com.leavemanagement.leave_management_system.service;

import com.leavemanagement.leave_management_system.entity.Employee;
import com.leavemanagement.leave_management_system.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id: " + id));
    }

    public Employee createEmployee(Employee employee) {
        if(employee.getLeaveBalance() == null){
            employee.setLeaveBalance(20);
        }
        if (employee.getManager() != null && employee.getManager().getId() != null) {
            Employee manager = employeeRepository.findById(employee.getManager().getId())
                    .orElseThrow(() -> new NoSuchElementException(
                            "Manager not found with id: " + employee.getManager().getId()));
            employee.setManager(manager);
        }
        return employeeRepository.save(employee);
    }
    public List<Employee> getEmployeesByManager(Long managerId) {
        return employeeRepository.findByManagerId(managerId);
    }
}