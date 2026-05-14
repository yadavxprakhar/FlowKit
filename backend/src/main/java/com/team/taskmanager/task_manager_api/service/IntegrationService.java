package com.team.taskmanager.task_manager_api.service;

import com.team.taskmanager.task_manager_api.dto.IntegrationDto;
import com.team.taskmanager.task_manager_api.model.IntegrationProvider;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.model.UserIntegration;
import com.team.taskmanager.task_manager_api.repository.UserIntegrationRepository;
import com.team.taskmanager.task_manager_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntegrationService {

    private final UserIntegrationRepository integrationRepository;
    private final UserRepository userRepository;

    /**
     * Returns the status of all 8 supported integration providers for the given user.
     * Providers not yet touched are returned as disconnected.
     */
    public List<IntegrationDto> getUserIntegrations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Build a map of existing records keyed by provider
        Map<IntegrationProvider, UserIntegration> existingMap = integrationRepository
                .findByUser(user)
                .stream()
                .collect(Collectors.toMap(UserIntegration::getProviderName, i -> i));

        // Return one entry per provider — existing or synthetic disconnected
        return Arrays.stream(IntegrationProvider.values())
                .map(provider -> {
                    UserIntegration existing = existingMap.get(provider);
                    if (existing != null) {
                        return IntegrationDto.fromEntity(existing);
                    }
                    return IntegrationDto.disconnected(provider);
                })
                .collect(Collectors.toList());
    }

    /**
     * Connects (or re-connects) an integration for the user.
     * Generates a simulated OAuth access token.
     */
    @Transactional
    public IntegrationDto connectIntegration(String email, String providerStr) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        IntegrationProvider provider = IntegrationProvider.valueOf(providerStr.toUpperCase());

        Optional<UserIntegration> existing = integrationRepository
                .findByUserAndProviderName(user, provider);

        UserIntegration integration;
        if (existing.isPresent()) {
            integration = existing.get();
            integration.setConnected(true);
            integration.setAccessToken("sim_token_" + UUID.randomUUID());
        } else {
            integration = UserIntegration.builder()
                    .user(user)
                    .providerName(provider)
                    .connected(true)
                    .accessToken("sim_token_" + UUID.randomUUID())
                    .build();
        }

        return IntegrationDto.fromEntity(integrationRepository.save(integration));
    }

    /**
     * Disconnects an integration for the user.
     */
    @Transactional
    public IntegrationDto disconnectIntegration(String email, String providerStr) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        IntegrationProvider provider = IntegrationProvider.valueOf(providerStr.toUpperCase());

        UserIntegration integration = integrationRepository
                .findByUserAndProviderName(user, provider)
                .orElseThrow(() -> new RuntimeException("Integration not found"));

        integration.setConnected(false);
        integration.setAccessToken(null);

        return IntegrationDto.fromEntity(integrationRepository.save(integration));
    }
}
