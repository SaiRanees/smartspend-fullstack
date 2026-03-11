package com.finance.tracker.repository;

import com.finance.tracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // ✅ Bug#6 fix: case-insensitive category lookup
    List<Transaction> findByCategoryIgnoreCase(String category);
    List<Transaction> findByType(String type);
}
