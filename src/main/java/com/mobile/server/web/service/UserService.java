package com.mobile.server.web.service;


import com.mobile.server.domain.model.User;
import com.mobile.server.web.repository.UserRepository;
import com.mobile.server.web.request.JoinRequest;
import com.mobile.server.web.request.LoginRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void join(JoinRequest joinRequest) {
        userRepository.addUser(joinRequest);
    }

    public User login(LoginRequest loginRequest) {
        return userRepository.findByEmail(loginRequest.getUserEmail())
                .filter(u -> u.getUserPassword().equals(loginRequest.getUserPassword()))
                .orElse(null);
    }
}
