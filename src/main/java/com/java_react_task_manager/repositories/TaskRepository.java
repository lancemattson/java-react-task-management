package com.java_react_task_manager.repositories;

import com.java_react_task_manager.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByIsCompleted(boolean isCompleted);
}
