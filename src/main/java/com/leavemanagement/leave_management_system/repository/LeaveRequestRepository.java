package com.leavemanagement.leave_management_system.repository;

import com.leavemanagement.leave_management_system.entity.LeaveRequest;
import com.leavemanagement.leave_management_system.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeId(Long employeeId);

    List<LeaveRequest> findByEmployeeManagerId(Long managerId);

    List<LeaveRequest> findByEmployeeManagerIdAndStatus(Long managerId, LeaveStatus status);
}