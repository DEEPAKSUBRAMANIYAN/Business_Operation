package com.business.bizflow.service;

import com.business.bizflow.dto.RegisterRequest;
import com.business.bizflow.entity.Company;
import com.business.bizflow.entity.CompanyUser;
import com.business.bizflow.entity.User;
import com.business.bizflow.enums.Role;
import com.business.bizflow.repository.CompanyRepository;
import com.business.bizflow.repository.CompanyUserRepository;
import com.business.bizflow.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final CompanyUserRepository companyUserRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistrationService(
            UserRepository userRepository,
            CompanyRepository companyRepository,
            CompanyUserRepository companyUserRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.companyUserRepository = companyUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getUserEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();

        user.setName(request.getUserName());
        user.setEmail(request.getUserEmail());

        // Hash the password before saving it
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        user.setPhone(request.getPhone());

        User savedUser = userRepository.save(user);

        Company company = new Company();

        company.setName(request.getCompanyName());
        company.setBusinessType(request.getBusinessType());
        company.setEmail(request.getCompanyEmail());
        company.setPhone(request.getCompanyPhone());
        company.setAddress(request.getAddress());

        Company savedCompany = companyRepository.save(company);

        CompanyUser companyUser = new CompanyUser();

        companyUser.setUser(savedUser);
        companyUser.setCompany(savedCompany);
        companyUser.setRole(Role.OWNER);

        companyUserRepository.save(companyUser);
    }
}