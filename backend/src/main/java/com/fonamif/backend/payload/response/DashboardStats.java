package com.fonamif.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {
    private long totalAgents;
    private long presentCount;
    private long lateCount;
    private long absentCount;
}
