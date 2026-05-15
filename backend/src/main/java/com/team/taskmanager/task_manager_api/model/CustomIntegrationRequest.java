package com.team.taskmanager.task_manager_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "custom_integration_requests")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomIntegrationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String integrationName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String userEmail;

    private LocalDateTime requestedAt;

    @PrePersist
    protected void onCreate() {
        requestedAt = LocalDateTime.now();
    }
}
