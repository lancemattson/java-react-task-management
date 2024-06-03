package com.java_react_task_manager.payload.response;

import com.java_react_task_manager.models.User;

public class RegisterMessage {
    String message;
    Boolean status;
    User user;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public RegisterMessage(String message, Boolean status, User user) {
        this.message = message;
        this.status = status;
        this.user = user;
    }
}
