package com.business.bizflow.controller;

import com.business.bizflow.entity.CompanyUser;
import com.business.bizflow.enums.Role;
import com.business.bizflow.service.CompanyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-users")
public class CompanyUserController {

    private final CompanyUserService companyUserService;

    public CompanyUserController(CompanyUserService companyUserService) {
        this.companyUserService = companyUserService;
    }

    @PostMapping
    public ResponseEntity<CompanyUser> createMembership(
            @RequestParam Long userId,
            @RequestParam Long companyId,
            @RequestParam Role role) {

        CompanyUser companyUser = companyUserService.createMembership(
                userId,
                companyId,
                role);

        return ResponseEntity.ok(companyUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyUser> findById(@PathVariable Long id) {

        CompanyUser companyUser = companyUserService.findById(id);

        if (companyUser == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(companyUser);
    }

    @GetMapping
    public ResponseEntity<List<CompanyUser>> findAll() {
        return ResponseEntity.ok(companyUserService.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CompanyUser>> findByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                companyUserService.findByUserId(userId));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<CompanyUser>> findByCompanyId(
            @PathVariable Long companyId) {

        return ResponseEntity.ok(
                companyUserService.findByCompanyId(companyId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {

        companyUserService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
