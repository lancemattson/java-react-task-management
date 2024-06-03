package com.java_react_task_manager.controllers;

import com.java_react_task_manager.dto.LoginDTO;
import com.java_react_task_manager.dto.RegisterDTO;
import com.java_react_task_manager.models.User;
import com.java_react_task_manager.payload.response.LoginMessage;
import com.java_react_task_manager.payload.response.RegisterMessage;
import com.java_react_task_manager.repositories.UserRepository;
import com.java_react_task_manager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginMessage loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO)
    {
        RegisterMessage registerResponse = userService.registerUser(registerDTO);
        return ResponseEntity.ok(registerResponse);
    }
}
