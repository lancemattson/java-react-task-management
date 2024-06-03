package com.java_react_task_manager.repositories;

import com.java_react_task_manager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
