package com.team.taskmanager.task_manager_api.controller;

import com.team.taskmanager.task_manager_api.dto.IntegrationRequestDTO;
import com.team.taskmanager.task_manager_api.model.CustomIntegrationRequest;
import com.team.taskmanager.task_manager_api.service.CustomIntegrationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class IntegrationRequestController {

    private final CustomIntegrationRequestService service;

    @PostMapping("/request")
    public ResponseEntity<CustomIntegrationRequest> requestIntegration(@RequestBody IntegrationRequestDTO dto) {
        return ResponseEntity.ok(service.saveRequest(dto));
    }
}
