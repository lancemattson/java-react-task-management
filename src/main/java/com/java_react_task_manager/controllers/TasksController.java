package com.java_react_task_manager.controllers;

import com.java_react_task_manager.models.Task;
import com.java_react_task_manager.repositories.TaskRepository;
import com.java_react_task_manager.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}")
public class TasksController {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public TasksController(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks-to-do")
    public List<Task> getToDoTasks(@PathVariable String userId) {
        return taskRepository.findByIsCompleted(false);
    }

    @GetMapping("/tasks-completed")
    public List<Task> getCompletedTasks(@PathVariable String userId) {
        return taskRepository.findByIsCompleted(true);
    }

    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable Long id, @PathVariable Long userId) {
        return taskRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task taskRequest, @PathVariable Long userId) throws Exception {
        System.out.println("Create Task");
        Task task = userRepository.findById(userId).map(user -> {
            LocalDate currentDate = LocalDate.now();
            taskRequest.setCreatedAt(Date.valueOf(currentDate));
            taskRequest.setUser(user);
            return taskRepository.save(taskRequest);
        }).orElseThrow(() -> new Exception("Not found user with id = " + userId));

        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskRequest, @PathVariable String userId) throws Exception {
        System.out.println("Update Task");

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new Exception("Task " + id + "not found"));
        task.setName(taskRequest.getName());
        task.setDueDate(taskRequest.getDueDate());
        task.setIsCompleted(taskRequest.getIsCompleted());

        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }

    @PostMapping("/tasks/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long id, @RequestBody Task taskRequest, @PathVariable String userId) throws Exception {
        System.out.println("Complete Task: " + taskRequest.getIsCompleted());
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new Exception("Task " + id + "not found"));
        task.setIsCompleted(taskRequest.getIsCompleted());
        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id, @PathVariable Long userId) throws Exception {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new Exception("Task " + id + "not found"));
        taskRepository.delete(task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

}
