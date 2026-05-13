package com.team.taskmanager.task_manager_api.dto;

import com.team.taskmanager.task_manager_api.model.Task;
import com.team.taskmanager.task_manager_api.model.TaskPriority;
import com.team.taskmanager.task_manager_api.model.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDateTime dueDate;
    private Long projectId;
    private Long assigneeId;
    private String assigneeName;
    private Long reporterId;
    private String reporterName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TaskDto fromEntity(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .projectId(task.getProject() != null ? task.getProject().getId() : null)
                .assigneeId(task.getAssignee() != null ? task.getAssignee().getId() : null)
                .assigneeName(task.getAssignee() != null ? task.getAssignee().getName() : null)
                .reporterId(task.getReporter() != null ? task.getReporter().getId() : null)
                .reporterName(task.getReporter() != null ? task.getReporter().getName() : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
