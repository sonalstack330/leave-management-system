package com.leavemanagement.leave_management_system.controller;

import com.leavemanagement.leave_management_system.dto.LeaveRequestDTO;
import com.leavemanagement.leave_management_system.dto.LeaveReviewDTO;
import com.leavemanagement.leave_management_system.entity.LeaveRequest;
import com.leavemanagement.leave_management_system.service.LeaveRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    @PostMapping
    public ResponseEntity<LeaveRequest> applyForLeave(@Valid @RequestBody LeaveRequestDTO dto) {
        LeaveRequest created = leaveRequestService.applyForLeave(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllRequests() {
        return ResponseEntity.ok(leaveRequestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveRequestService.getRequestById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getRequestsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getRequestsByEmployee(employeeId));
    }

    @GetMapping("/manager/{managerId}/pending")
    public ResponseEntity<List<LeaveRequest>> getPendingRequestsForManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(leaveRequestService.getPendingRequestsForManager(managerId));
    }

    @PutMapping("/{id}/review")
    public ResponseEntity<LeaveRequest> reviewRequest(@PathVariable Long id,
                                                      @Valid @RequestBody LeaveReviewDTO reviewDTO) {
        return ResponseEntity.ok(leaveRequestService.reviewRequest(id, reviewDTO));
    }
}