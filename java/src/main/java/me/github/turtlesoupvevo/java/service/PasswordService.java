package me.github.turtlesoupvevo.java.service;

import me.github.turtlesoupvevo.java.repository.PasswordRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final PasswordEncoder passwordEncoder;
    private final PasswordRepository passwordRepository;

    public PasswordService(PasswordEncoder passwordEncoder, PasswordRepository passwordRepository) {
        this.passwordEncoder = passwordEncoder;
        this.passwordRepository = passwordRepository;
    }

    public boolean checkPassword(String password) {
        return passwordEncoder.matches(password, passwordRepository.findFirstDocument(1).getPassword());
    }
}
