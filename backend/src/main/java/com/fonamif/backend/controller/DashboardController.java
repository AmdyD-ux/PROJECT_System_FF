package com.fonamif.backend.controller;

import com.fonamif.backend.payload.response.DashboardStats;
import com.fonamif.backend.repository.AttendanceRecordRepository;
import com.fonamif.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AttendanceRecordRepository attendanceRecordRepository;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardStats getAdminStats() {
        long totalUsers = userRepository.count();
        // Mock calculations for demo
        long present = attendanceRecordRepository.count(); 
        long late = present / 5; // Mock: 20% late
        long absent = totalUsers - present;
        
        return new DashboardStats(totalUsers, present, late, absent);
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public DashboardStats getManagerStats() {
        // In real app, filter by manager's department
        long totalUsers = userRepository.count() / 3; // Mock
        long present = 10;
        long late = 2;
        long absent = totalUsers - present;

        return new DashboardStats(totalUsers, present, late, absent);
    }
}
