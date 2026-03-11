package com.finance.tracker.controller;

import com.finance.tracker.model.Transaction;
import com.finance.tracker.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    // POST /api/transactions
    @PostMapping
    public ResponseEntity<Transaction> add(@Valid @RequestBody Transaction t) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addTransaction(t));
    }

    // GET /api/transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAll() {
        return ResponseEntity.ok(service.getAllTransactions());
    }

    // GET /api/transactions/category/Food
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Transaction>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(service.getByCategory(category));
    }

    // DELETE /api/transactions/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        service.deleteTransaction(id); // throws TransactionNotFoundException if missing
        return ResponseEntity.ok(Map.of("message", "Transaction deleted successfully"));
    }

    // GET /api/transactions/summary
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Double>> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    // GET /api/transactions/summary/category
    @GetMapping("/summary/category")
    public ResponseEntity<Map<String, Double>> getSummaryByCategory() {
        return ResponseEntity.ok(service.getSummaryByCategory());
    }
}
