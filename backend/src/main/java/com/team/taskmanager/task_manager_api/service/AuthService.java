package com.team.taskmanager.task_manager_api.service;

import com.team.taskmanager.task_manager_api.dto.AuthenticationRequest;
import com.team.taskmanager.task_manager_api.dto.AuthenticationResponse;
import com.team.taskmanager.task_manager_api.dto.RegisterRequest;
import com.team.taskmanager.task_manager_api.dto.FacebookUserDTO;
import com.team.taskmanager.task_manager_api.model.Role;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import com.team.taskmanager.task_manager_api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_MEMBER) // Default role
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse facebookLogin(String accessToken) {
        // 1. Verify token with Facebook
        String facebookUrl = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken;
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        FacebookUserDTO fbUser = restTemplate.getForObject(facebookUrl, FacebookUserDTO.class);

        if (fbUser == null || fbUser.getEmail() == null) {
            throw new RuntimeException("Invalid Facebook token");
        }

        // 2. Check if user exists, or create new
        var user = repository.findByEmail(fbUser.getEmail())
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .name(fbUser.getName())
                            .email(fbUser.getEmail())
                            .password(passwordEncoder.encode("FB_" + fbUser.getId())) // Dummy password for social users
                            .role(Role.ROLE_MEMBER)
                            .build();
                    return repository.save(newUser);
                });

        // 3. Generate token
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}

