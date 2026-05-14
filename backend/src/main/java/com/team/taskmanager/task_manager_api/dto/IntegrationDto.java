package com.team.taskmanager.task_manager_api.dto;

import com.team.taskmanager.task_manager_api.model.IntegrationProvider;
import com.team.taskmanager.task_manager_api.model.UserIntegration;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class IntegrationDto {
    private Long id;
    private String providerName;
    private boolean connected;
    private LocalDateTime connectedAt;

    public static IntegrationDto fromEntity(UserIntegration integration) {
        return IntegrationDto.builder()
                .id(integration.getId())
                .providerName(integration.getProviderName().name())
                .connected(integration.isConnected())
                .connectedAt(integration.isConnected() ? integration.getConnectedAt() : null)
                .build();
    }

    public static IntegrationDto disconnected(IntegrationProvider provider) {
        return IntegrationDto.builder()
                .id(null)
                .providerName(provider.name())
                .connected(false)
                .connectedAt(null)
                .build();
    }
}
