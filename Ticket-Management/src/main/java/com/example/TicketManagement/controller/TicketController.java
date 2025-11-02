package com.example.TicketManagement.controller;

import com.example.TicketManagement.dto.TicketManagement.TicketDTO;
import com.example.TicketManagement.model.Ticket;
import com.example.TicketManagement.model.TicketManagement;
import com.example.TicketManagement.service.TicketManagementService;
import com.example.TicketManagement.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    private TicketManagementService ticketManagementService; // for logging

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket createdTicket = ticketService.createTicket(ticket);

        // ✅ Pass Ticket object instead of just ticketId
        ticketManagementService.logAction(
                createdTicket,
                createdTicket.getCreatedBy(),
                "CREATED",
                "Ticket created successfully"
        );

        return ResponseEntity.ok(createdTicket);
    }

    // ✅ Get All Tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();

        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no tickets
        }
        return ResponseEntity.ok(tickets); // 200 OK with data
    }

    // ✅ Update Ticket + Log Action
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable String id,
            @RequestBody Ticket updatedTicket) {

        Ticket ticket = ticketService.updateTicket(id, updatedTicket);

        // ✅ Pass Ticket object
        ticketManagementService.logAction(
                ticket,
                updatedTicket.getCreatedBy(),
                "UPDATED",
                "Ticket updated successfully"
        );

        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/with-management")
    public ResponseEntity<List<TicketDTO>> getAllTicketsWithManagement() {
        List<Ticket> tickets = ticketService.getAllTickets();

        List<TicketDTO> ticketDTOs = tickets.stream().map(ticket -> {
            TicketDTO dto = new TicketDTO();
            dto.setTicketId(ticket.getTicketId());
            dto.setCreatedBy(ticket.getCreatedBy());
            dto.setSubject(ticket.getSubject());
            dto.setDescription(ticket.getDescription());
            dto.setType(ticket.getType());

            // Fetch latest management entry for this ticket
            TicketManagement management = ticketManagementService.getLatestByTicket(ticket.getTicketId());
            if (management != null) {
                dto.setState(management.getState());
                dto.setAction(management.getAction());
                dto.setCreatedUser(management.getCreatedUser());
                dto.setActionTime(management.getActionTime());
            }

            return dto;
        }).toList();

        return ResponseEntity.ok(ticketDTOs);
    }

}
