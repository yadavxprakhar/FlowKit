package com.team.taskmanager.task_manager_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "time_logs")
public class TimeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"project", "assignee", "reporter", "hibernateLazyInitializer", "handler"})
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"password", "projects", "hibernateLazyInitializer", "handler"})
    private User user;

    @CreationTimestamp
    private LocalDateTime loggedAt;

    @Builder.Default
    private boolean isBillable = true;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TimeLogStatus status = TimeLogStatus.PENDING;

    public enum TimeLogStatus {
        PENDING, APPROVED, REJECTED
    }
}
