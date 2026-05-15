package com.team.taskmanager.task_manager_api.service;

import com.team.taskmanager.task_manager_api.dto.IntegrationRequestDTO;
import com.team.taskmanager.task_manager_api.model.CustomIntegrationRequest;
import com.team.taskmanager.task_manager_api.repository.CustomIntegrationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomIntegrationRequestService {

    private final CustomIntegrationRequestRepository repository;

    public CustomIntegrationRequest saveRequest(IntegrationRequestDTO dto) {
        CustomIntegrationRequest request = CustomIntegrationRequest.builder()
                .integrationName(dto.getIntegrationName())
                .description(dto.getDescription())
                .userEmail(dto.getUserEmail())
                .build();
        return repository.save(request);
    }
}
