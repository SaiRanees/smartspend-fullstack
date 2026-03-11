package com.finance.tracker.service;

import com.finance.tracker.exception.TransactionNotFoundException;
import com.finance.tracker.model.Transaction;
import com.finance.tracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repo;

    public Transaction addTransaction(Transaction t) {
        // ✅ Bug#6 fix: normalize category to Title Case on save
        if (t.getCategory() != null) {
            t.setCategory(capitalize(t.getCategory()));
        }
        return repo.save(t);
    }

    public List<Transaction> getAllTransactions() {
        return repo.findAll();
    }

    public List<Transaction> getByCategory(String category) {
        // ✅ Bug#6 fix: search case-insensitively
        return repo.findByCategoryIgnoreCase(category);
    }

    public void deleteTransaction(Long id) {
        if (!repo.existsById(id)) {
            throw new TransactionNotFoundException(id);
        }
        repo.deleteById(id);
    }

    public Map<String, Double> getSummary() {
        List<Transaction> all = repo.findAll();

        double income = all.stream()
                .filter(t -> "INCOME".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double expense = all.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        Map<String, Double> summary = new LinkedHashMap<>();
        summary.put("totalIncome",  income);
        summary.put("totalExpense", expense);
        summary.put("balance",      income - expense);
        return summary;
    }

    // ✅ Bug#6 fix: normalize category key before grouping — "food" and "Food" → same bucket
    public Map<String, Double> getSummaryByCategory() {
        return repo.findAll().stream()
                .collect(Collectors.groupingBy(
                        t -> capitalize(t.getCategory()),
                        Collectors.summingDouble(t ->
                                "EXPENSE".equalsIgnoreCase(t.getType()) ? t.getAmount() : 0.0
                        )
                ));
    }

    // ─── Helper ──────────────────────────────────────────────────
    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase();
    }
}
