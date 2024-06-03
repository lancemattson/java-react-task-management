package com.java_react_task_manager.services;

import com.java_react_task_manager.dto.LoginDTO;
import com.java_react_task_manager.dto.RegisterDTO;
import com.java_react_task_manager.interfaces.UserInterface;
import com.java_react_task_manager.models.User;
import com.java_react_task_manager.payload.response.LoginMessage;
import com.java_react_task_manager.payload.response.RegisterMessage;
import com.java_react_task_manager.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserInterface {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterMessage registerUser(RegisterDTO registerDTO) {
        User user1 = userRepository.findByEmail(registerDTO.getEmail());
        if (user1 != null) {
            return new RegisterMessage("User already exists", false, null);
        }
        User user = new User(
                registerDTO.getId(),
                registerDTO.getFirstName(),
                registerDTO.getLastName(),
                registerDTO.getEmail(),
                passwordEncoder.encode(registerDTO.getPassword())
        );
        userRepository.save(user);
        return new RegisterMessage("Register Success", true, user);
    }

    RegisterDTO employeeDTO;
    @Override
    public LoginMessage loginUser(LoginDTO loginDTO) {
        User user1 = userRepository.findByEmail(loginDTO.getEmail());
        if (user1 == null) {
            return new LoginMessage("Email does not exist", false, null);
        }

        String password = loginDTO.getPassword();
        String encodedPassword = user1.getPassword();
        if (!passwordEncoder.matches(password, encodedPassword)) {
            return new LoginMessage("Password does not match", false, null);
        }

        Optional<User> user = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
        if (user.isEmpty()) {
            return new LoginMessage("Login Failed", false, null);
        }

        return new LoginMessage("Login Success", true, user.get());
    }
}
