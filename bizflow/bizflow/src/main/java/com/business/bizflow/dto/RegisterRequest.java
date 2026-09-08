package com.business.bizflow.dto;

import com.business.bizflow.enums.BusinessType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    @Size(max = 100)
    private String userName;

    @NotBlank
    @Email
    @Size(max = 255)
    private String userEmail;

    @NotBlank
    @Size(min = 6, max = 255)
    private String password;

    @NotBlank
    @Size(max = 20)
    private String phone;

    @NotBlank
    @Size(max = 255)
    private String companyName;

    @NotNull
    private BusinessType businessType;

    @Email
    @Size(max = 255)
    private String companyEmail;

    @Size(max = 20)
    private String companyPhone;

    private String address;
}