package com.java_react_task_manager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "dueDate")
    private Date dueDate;

    @Column(name = "isCompleted")
    private boolean isCompleted;

    @Column(name = "created_at")
    private Date created_at;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable=false)
    @JsonIgnore
    private User user;

    public Task() {
    }

    public Task(Long id, Long user_id, String name, Date dueDate, boolean isCompleted, Date created_at) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
        this.created_at = created_at;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String name) {
        this.name = name;
    }

    public User getUser() { return user; }
    public void setUser(User user) {
        this.user = user;
    }

    public Date getDueDate() { return dueDate; }
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreatedAt() { return created_at; }
    public void setCreatedAt(Date createdAt) {
        this.created_at = createdAt;
    }

    public boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
