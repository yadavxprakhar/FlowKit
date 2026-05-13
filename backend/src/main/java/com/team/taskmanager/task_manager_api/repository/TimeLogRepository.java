package com.team.taskmanager.task_manager_api.repository;

import com.team.taskmanager.task_manager_api.model.TimeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLogRepository extends JpaRepository<TimeLog, Long> {
    List<TimeLog> findByTaskId(Long taskId);
    List<TimeLog> findByUserId(Long userId);
}
