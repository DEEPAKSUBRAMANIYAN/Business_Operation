package com.business.bizflow.service;
import org.springframework.stereotype.Service;
import com.business.bizflow.entity.CompanyUser;
import com.business.bizflow.repository.CompanyRepository;
import com.business.bizflow.repository.CompanyUserRepository;
import com.business.bizflow.repository.UserRepository;
import com.business.bizflow.exception.DuplicateMembershipException;
import com.business.bizflow.exception.ResourceNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
@Service 
public class CompanyUserService {
    @Autowired
    private final CompanyUserRepository companyUserRepository;
private final UserRepository userRepository;
private final CompanyRepository companyRepository;

public CompanyUserService(
        CompanyUserRepository companyUserRepository,
        UserRepository userRepository,
        CompanyRepository companyRepository) {

    this.companyUserRepository = companyUserRepository;
    this.userRepository = userRepository;
    this.companyRepository = companyRepository;
}

    public CompanyUser save(CompanyUser companyUser) {
        return companyUserRepository.save(companyUser);
    }

    public CompanyUser findById(Long id) {
        return companyUserRepository.findById(id)
                .orElse(null);
    }

    public List<CompanyUser> findAll() {
        return companyUserRepository.findAll();
    }

    public void deleteById(Long id) {
        companyUserRepository.deleteById(id);
    }
    public boolean membershipExists(Long userId, Long companyId) {
    return companyUserRepository.existsByUserIdAndCompanyId(userId, companyId);
}
 public List<CompanyUser> findByUserId(Long userId) {
        return companyUserRepository.findByUserId(userId);
    }

    public List<CompanyUser> findByCompanyId(Long companyId) {
        return companyUserRepository.findByCompanyId(companyId);
    }
    public CompanyUser createMembership(
        Long userId,
        Long companyId,
        com.business.bizflow.enums.Role role) {

    if (!userRepository.existsById(userId)) {
        throw new ResourceNotFoundException("User not found");
        
    }
    if (companyUserRepository.existsByUserIdAndCompanyId(userId, companyId)) {
    throw new DuplicateMembershipException(
            "User is already a member of this company"
    );
}

    if (!companyRepository.existsById(companyId)) {
        throw new ResourceNotFoundException("Company not found");
    }

    if (companyUserRepository.existsByUserIdAndCompanyId(userId, companyId)) {
        throw new ResourceNotFoundException("User is already a member of this company");
    }

    CompanyUser companyUser = new CompanyUser();

    companyUser.setUser(userRepository.findById(userId).orElseThrow());
    companyUser.setCompany(companyRepository.findById(companyId).orElseThrow());
    companyUser.setRole(role);

    return companyUserRepository.save(companyUser);
}
}
