package com.fonamif.backend.repository;

import com.fonamif.backend.model.AttendanceRecord;
import com.fonamif.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    List<AttendanceRecord> findByUser(User user);
    List<AttendanceRecord> findByUser_Department_Id(Long departmentId);
}
