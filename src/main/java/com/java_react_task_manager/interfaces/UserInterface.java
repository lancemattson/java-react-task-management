package com.java_react_task_manager.interfaces;

import com.java_react_task_manager.dto.LoginDTO;
import com.java_react_task_manager.dto.RegisterDTO;
import com.java_react_task_manager.payload.response.LoginMessage;
import com.java_react_task_manager.payload.response.RegisterMessage;

public interface UserInterface {
    RegisterMessage registerUser(RegisterDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
}
