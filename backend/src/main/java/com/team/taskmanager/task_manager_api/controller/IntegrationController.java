package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.dto.IntegrationDto;
import com.team.taskmanager.task_manager_api.service.IntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class IntegrationController {

    private final IntegrationService integrationService;

    /**
     * GET /api/v1/integrations
     * Returns all 8 integration providers with their connection status for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<IntegrationDto>> getUserIntegrations(Authentication authentication) {
        return ResponseEntity.ok(integrationService.getUserIntegrations(authentication.getName()));
    }

    /**
     * POST /api/v1/integrations/{provider}/connect
     * Connects the specified integration for the authenticated user.
     */
    @PostMapping("/{provider}/connect")
    public ResponseEntity<IntegrationDto> connectIntegration(
            @PathVariable String provider,
            Authentication authentication) {
        return ResponseEntity.ok(integrationService.connectIntegration(authentication.getName(), provider));
    }

    /**
     * DELETE /api/v1/integrations/{provider}/disconnect
     * Disconnects the specified integration for the authenticated user.
     */
    @DeleteMapping("/{provider}/disconnect")
    public ResponseEntity<IntegrationDto> disconnectIntegration(
            @PathVariable String provider,
            Authentication authentication) {
        return ResponseEntity.ok(integrationService.disconnectIntegration(authentication.getName(), provider));
    }
}
