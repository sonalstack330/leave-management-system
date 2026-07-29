package com.leavemanagement.leave_management_system.dto;

import com.leavemanagement.leave_management_system.entity.LeaveStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LeaveReviewDTO {

    @NotNull
    private LeaveStatus status; // APPROVED or REJECTED

    private String reviewComment;
}