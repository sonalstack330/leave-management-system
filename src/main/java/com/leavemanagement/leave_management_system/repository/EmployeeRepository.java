package com.leavemanagement.leave_management_system.repository;

import com.leavemanagement.leave_management_system.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByManagerId(Long managerId);
}