package com.business.bizflow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private Long userId;
    private String name;
    private String email;

    public LoginResponse(
            String token,
            Long userId,
            String name,
            String email) {

        this.token = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}