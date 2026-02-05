package com.fonamif.backend.repository;

import com.fonamif.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

    Optional<User> findByFingerprintTemplate(String fingerprintTemplate);
    Optional<User> findByQrCodeData(String qrCodeData);
    Optional<User> findByBarcodeData(String barcodeData);

}
