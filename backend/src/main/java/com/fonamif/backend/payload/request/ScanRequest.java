package com.fonamif.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ScanRequest {
    @NotBlank
    private String method; // BIOMETRIC, QR_CODE, BARCODE

    @NotBlank
    private String data; // The string content scanned
}
