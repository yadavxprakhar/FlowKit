package com.team.taskmanager.task_manager_api.repository;

import com.team.taskmanager.task_manager_api.model.IntegrationProvider;
import com.team.taskmanager.task_manager_api.model.User;
import com.team.taskmanager.task_manager_api.model.UserIntegration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserIntegrationRepository extends JpaRepository<UserIntegration, Long> {
    List<UserIntegration> findByUser(User user);
    Optional<UserIntegration> findByUserAndProviderName(User user, IntegrationProvider providerName);
}
