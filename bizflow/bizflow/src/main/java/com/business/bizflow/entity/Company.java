package com.business.bizflow.entity;

import com.business.bizflow.enums.BusinessType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import com.business.bizflow.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private BusinessType businessType;

    private String email;

    private String phone;

    private String address;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
    LocalDateTime now = LocalDateTime.now();
    createdAt = now;
    updatedAt = now;
   }

    @PreUpdate
    protected void onUpdate() {
    updatedAt = LocalDateTime.now();
    } 
}