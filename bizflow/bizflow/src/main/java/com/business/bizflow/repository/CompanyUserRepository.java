package com.business.bizflow.repository;

import com.business.bizflow.entity.CompanyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompanyUserRepository extends JpaRepository<CompanyUser, Long> {
    boolean existsByUserIdAndCompanyId(Long userId, Long companyId);
    List<CompanyUser> findByUserId(Long userId);

    List<CompanyUser> findByCompanyId(Long companyId);
}
