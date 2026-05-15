package com.team.taskmanager.task_manager_api.repository;

import com.team.taskmanager.task_manager_api.model.CustomIntegrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomIntegrationRequestRepository extends JpaRepository<CustomIntegrationRequest, Long> {
}
