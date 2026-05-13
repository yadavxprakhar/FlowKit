package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.model.Task;
import com.team.taskmanager.task_manager_api.model.TimeLog;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.TaskRepository;
import com.team.taskmanager.task_manager_api.repository.TimeLogRepository;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/timer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TimeLogController {

    private final TimeLogRepository timeLogRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @PostMapping("/start/{taskId}")
    public ResponseEntity<TimeLog> startTimer(@PathVariable Long taskId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        TimeLog log = TimeLog.builder()
                .startTime(LocalDateTime.now())
                .task(task)
                .user(user)
                .build();

        return ResponseEntity.ok(timeLogRepository.save(log));
    }

    @PostMapping("/stop/{logId}")
    public ResponseEntity<TimeLog> stopTimer(@PathVariable Long logId) {
        TimeLog log = timeLogRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("Time log not found"));
        
        log.setEndTime(LocalDateTime.now());
        // Simple duration calculation in minutes could be added here or on frontend
        return ResponseEntity.ok(timeLogRepository.save(log));
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TimeLog>> getTaskLogs(@PathVariable Long taskId) {
        return ResponseEntity.ok(timeLogRepository.findByTaskId(taskId));
    }
}
