package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/debug")
@RequiredArgsConstructor
public class DebugController {

    private final UserRepository userRepository;

    @GetMapping("/users")
    public List<String> listUsers() {
        return userRepository.findAll().stream()
                .map(user -> "Name: " + user.getName() + " | Email: " + user.getEmail())
                .collect(Collectors.toList());
    }
}
