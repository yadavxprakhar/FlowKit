package com.team.taskmanager.task_manager_api.repository;

import com.team.taskmanager.task_manager_api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwnerId(Long ownerId);
    List<Project> findByMembers_Id(Long userId);
}
