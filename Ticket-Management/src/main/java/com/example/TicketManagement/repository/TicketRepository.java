package com.example.TicketManagement.repository;
import com.example.TicketManagement.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {
}
