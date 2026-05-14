package com.team.taskmanager.task_manager_api.service;

import com.team.taskmanager.task_manager_api.dto.ProjectDto;
import com.team.taskmanager.task_manager_api.model.Project;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.repository.ProjectRepository;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public ProjectDto createProject(ProjectDto request, String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .owner(owner)
                .build();
        
        project.getMembers().add(owner); // Owner is naturally a member

        Project savedProject = projectRepository.save(project);
        return ProjectDto.fromEntity(savedProject);
    }

    public List<ProjectDto> getUserProjects(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Find projects where user is owner OR user is a member
        List<Project> ownerProjects = projectRepository.findByOwnerId(user.getId());
        List<Project> memberProjects = projectRepository.findByMembers_Id(user.getId());
        
        // Merge and distinct
        ownerProjects.addAll(memberProjects);
        return ownerProjects.stream()
                .distinct()
                .map(ProjectDto::fromEntity)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return ProjectDto.fromEntity(project);
    }

    @Transactional
    public void addMemberToProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        project.getMembers().add(user);
        projectRepository.save(project);
    }

    public List<User> getProjectMembers(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return project.getMembers();
    }
}
