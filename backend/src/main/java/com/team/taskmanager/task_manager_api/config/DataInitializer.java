package com.team.taskmanager.task_manager_api.config;

import com.team.taskmanager.task_manager_api.model.Project;
import com.team.taskmanager.task_manager_api.model.Role;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.ProjectRepository;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Create test user
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@flowkit.com")
                    .password(passwordEncoder.encode("password"))
                    .role(Role.ROLE_MEMBER) // Updated to match Role enum
                    .build();
            userRepository.save(admin);

            // Create test project
            Project welcomeProject = Project.builder()
                    .name("Welcome Project")
                    .description("This is your first project in Flowkit. Welcome aboard!")
                    .owner(admin)
                    .members(new java.util.HashSet<>(Collections.singletonList(admin)))
                    .build();
            projectRepository.save(welcomeProject);

            System.out.println("--- Data Initialized: Test user and project created ---");
        }
    }
}
