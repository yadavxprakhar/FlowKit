package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.dto.ProjectDto;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto, Authentication authentication) {
        return ResponseEntity.ok(projectService.createProject(projectDto, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getUserProjects(Authentication authentication) {
        return ResponseEntity.ok(projectService.getUserProjects(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/{projectId}/members/{userId}")
    public ResponseEntity<Void> addMember(@PathVariable Long projectId, @PathVariable Long userId) {
        projectService.addMemberToProject(projectId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<User>> getProjectMembers(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectService.getProjectMembers(projectId));
    }
}
