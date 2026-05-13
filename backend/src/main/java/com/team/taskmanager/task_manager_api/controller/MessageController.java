package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.model.Message;
import com.team.taskmanager.task_manager_api.model.Project;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.MessageRepository;
import com.team.taskmanager.task_manager_api.repository.ProjectRepository;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Message>> getProjectMessages(@PathVariable Long projectId) {
        return ResponseEntity.ok(messageRepository.findByProjectIdOrderByCreatedAtAsc(projectId));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody MessageRequest request, Authentication authentication) {
        User sender = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Message message = Message.builder()
                .content(request.getContent())
                .sender(sender)
                .project(project)
                .build();

        return ResponseEntity.ok(messageRepository.save(message));
    }

    // DTO for request
    @lombok.Data
    public static class MessageRequest {
        private String content;
        private Long projectId;
    }
}
