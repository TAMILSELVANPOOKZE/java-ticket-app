package com.example.TicketManagement.service;

import com.example.TicketManagement.model.Ticket;
import com.example.TicketManagement.model.TicketManagement;
import com.example.TicketManagement.repository.TicketManagementRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketManagementService {

    private final TicketManagementRepository ticketManagementRepository;

    public TicketManagementService(TicketManagementRepository ticketManagementRepository) {
        this.ticketManagementRepository = ticketManagementRepository;
    }

    // ✅ logAction now takes Ticket object
    public void logAction(Ticket ticket, String createdUser, String action, String state) {
        TicketManagement management = new TicketManagement();
        management.setTicket(ticket);          // pass full Ticket object
        management.setCreatedUser(createdUser);
        management.setAction(action);
        management.setState(state);
        ticketManagementRepository.save(management);
    }

    public TicketManagement getLatestByTicket(String ticketId) {
        return ticketManagementRepository
                .findTopByTicket_TicketIdOrderByActionTimeDesc(ticketId)
                .orElse(null);
    }

}
