package com.fonamif.backend.controller;

import com.fonamif.backend.model.AttendanceMethod;
import com.fonamif.backend.model.AttendanceRecord;
import com.fonamif.backend.model.AttendanceType;
import com.fonamif.backend.model.User;
import com.fonamif.backend.payload.request.ScanRequest;
import com.fonamif.backend.payload.response.MessageResponse;
import com.fonamif.backend.repository.AttendanceRecordRepository;
import com.fonamif.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    @Autowired
    AttendanceRecordRepository attendanceRecordRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/scan")
    public ResponseEntity<?> scanAttendance(@Valid @RequestBody ScanRequest scanRequest) {
        Optional<User> userOptional = Optional.empty();
        AttendanceMethod method;

        try {
            method = AttendanceMethod.valueOf(scanRequest.getMethod().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid Attendance Method"));
        }

        switch (method) {
            case BIOMETRIC:
                userOptional = userRepository.findByFingerprintTemplate(scanRequest.getData());
                break;
            case QR_CODE:
                userOptional = userRepository.findByQrCodeData(scanRequest.getData());
                break;
            case BARCODE:
                userOptional = userRepository.findByBarcodeData(scanRequest.getData());
                break;
        }

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found for given identification data."));
        }

        User user = userOptional.get();
        LocalDateTime now = LocalDateTime.now();

        // Simple logic: If last record today was IN, then OUT. Else IN.
        // For production, more complex logic (shifts) needed. TDR implies basic pointage.
        
        AttendanceType type = AttendanceType.IN; // Default

        // Check last record
        // This is simplified. Ideally check today's records.
        // We will assume simpler logic for prototype: Just log it.
        // Or fetch last record for user.
        // For now, let's just create an IN record if morning, OUT if afternoon? 
        // Or toggle based on last.
        
        // Let's implement toggle logic based on last record:
        java.util.List<AttendanceRecord> records = attendanceRecordRepository.findByUser(user);
        if (!records.isEmpty()) {
            AttendanceRecord last = records.get(records.size() - 1);
            if (last.getType() == AttendanceType.IN) {
                type = AttendanceType.OUT;
            }
        }

        AttendanceRecord record = new AttendanceRecord();
        record.setUser(user);
        record.setTimestamp(now);
        record.setType(type);
        record.setMethod(method);
        
        // Determine status (Late, On Time) - Placeholder logic
        if (type == AttendanceType.IN && now.getHour() > 9) {
            record.setStatus("LATE");
        } else {
            record.setStatus("ON_TIME");
        }

        attendanceRecordRepository.save(record);

        return ResponseEntity.ok(new MessageResponse("Attendance recorded: " + type + " for " + user.getFullName()));
    }
}
