package com.business.bizflow.controller;

import com.business.bizflow.dto.RegisterRequest;
import com.business.bizflow.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        registrationService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registration successful");
    }
}