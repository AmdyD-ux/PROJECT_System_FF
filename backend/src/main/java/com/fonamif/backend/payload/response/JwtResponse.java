package com.fonamif.backend.payload.response;

import lombok.Data;
import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String fullName;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String fullName, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.roles = roles;
    }
}
