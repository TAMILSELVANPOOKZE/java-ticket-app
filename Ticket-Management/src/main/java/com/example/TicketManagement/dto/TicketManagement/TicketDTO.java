package com.example.TicketManagement.dto.TicketManagement;

import java.time.LocalDateTime;

public class TicketDTO {
    private String ticketId;
    private String createdBy;
    private String subject;
    private String description;
    private String type;

    // From TicketManagement
    private String state;
    private String action;
    private String createdUser;
    private LocalDateTime actionTime;

    // Getters & Setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getCreatedUser() { return createdUser; }
    public void setCreatedUser(String createdUser) { this.createdUser = createdUser; }

    public LocalDateTime getActionTime() { return actionTime; }
    public void setActionTime(LocalDateTime actionTime) { this.actionTime = actionTime; }
}
