package com.business.bizflow.repository;

import com.business.bizflow.entity.Company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
