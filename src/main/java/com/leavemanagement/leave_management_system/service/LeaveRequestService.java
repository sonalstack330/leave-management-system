package com.leavemanagement.leave_management_system.service;

import com.leavemanagement.leave_management_system.dto.LeaveRequestDTO;
import com.leavemanagement.leave_management_system.dto.LeaveReviewDTO;
import com.leavemanagement.leave_management_system.entity.Employee;
import com.leavemanagement.leave_management_system.entity.LeaveRequest;
import com.leavemanagement.leave_management_system.entity.LeaveStatus;
import com.leavemanagement.leave_management_system.repository.EmployeeRepository;
import com.leavemanagement.leave_management_system.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }

    public LeaveRequest getRequestById(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Leave request not found with id: " + id));
    }

    public List<LeaveRequest> getRequestsByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getPendingRequestsForManager(Long managerId) {
        return leaveRequestRepository.findByEmployeeManagerIdAndStatus(managerId, LeaveStatus.PENDING);
    }

    @Transactional
    public LeaveRequest applyForLeave(LeaveRequestDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id: " + dto.getEmployeeId()));

        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new IllegalStateException("End date cannot be before start date");
        }

        long requestedDays = ChronoUnit.DAYS.between(dto.getStartDate(), dto.getEndDate()) + 1;
        if (requestedDays > employee.getLeaveBalance()) {
            throw new IllegalStateException("Insufficient leave balance. Available: " + employee.getLeaveBalance() + " day(s)");
        }

        LeaveRequest request = new LeaveRequest();
        request.setEmployee(employee);
        request.setStartDate(dto.getStartDate());
        request.setEndDate(dto.getEndDate());
        request.setReason(dto.getReason());
        request.setStatus(LeaveStatus.PENDING);

        return leaveRequestRepository.save(request);
    }

    @Transactional
    public LeaveRequest reviewRequest(Long requestId, LeaveReviewDTO reviewDTO) {
        LeaveRequest request = getRequestById(requestId);

        if (request.getStatus() != LeaveStatus.PENDING) {
            throw new IllegalStateException("This request has already been " + request.getStatus());
        }

        request.setStatus(reviewDTO.getStatus());
        request.setReviewComment(reviewDTO.getReviewComment());

        if (reviewDTO.getStatus() == LeaveStatus.APPROVED) {
            Employee employee = request.getEmployee();
            long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
            employee.setLeaveBalance((int) (employee.getLeaveBalance() - days));
            employeeRepository.save(employee);
        }

        return leaveRequestRepository.save(request);
    }
}