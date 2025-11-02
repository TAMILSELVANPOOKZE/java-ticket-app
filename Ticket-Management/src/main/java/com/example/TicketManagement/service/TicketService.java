package com.example.TicketManagement.service;

import com.example.TicketManagement.model.Ticket;
import com.example.TicketManagement.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket updateTicket(String  id, Ticket updatedTicket) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setCreatedBy(updatedTicket.getCreatedBy());
            ticket.setSubject(updatedTicket.getSubject());
            ticket.setDescription(updatedTicket.getDescription());
            ticket.setType(updatedTicket.getType());
            return ticketRepository.save(ticket);
        }).orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    }
}

