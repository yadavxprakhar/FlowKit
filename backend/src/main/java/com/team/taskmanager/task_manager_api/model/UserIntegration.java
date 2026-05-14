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
@Table(name = "user_integrations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "provider_name"})
})
public class UserIntegration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_name", nullable = false)
    private IntegrationProvider providerName;

    @Column(nullable = false)
    private boolean connected;

    // Simulated access token — in production this would be the real OAuth token
    @Column(name = "access_token", columnDefinition = "TEXT")
    private String accessToken;

    @CreationTimestamp
    private LocalDateTime connectedAt;
}
