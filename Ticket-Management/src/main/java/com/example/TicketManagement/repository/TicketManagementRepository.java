package com.example.TicketManagement.repository;

import com.example.TicketManagement.model.TicketManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TicketManagementRepository extends JpaRepository<TicketManagement, String> {
    Optional<TicketManagement> findTopByTicket_TicketIdOrderByActionTimeDesc(String ticketId);
}
