package com.team.taskmanager.task_manager_api.repository;

import com.team.taskmanager.task_manager_api.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByProjectIdOrderByCreatedAtAsc(Long projectId);
}
