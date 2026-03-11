package com.finance.tracker;

import com.finance.tracker.model.Transaction;
import com.finance.tracker.repository.TransactionRepository;
import com.finance.tracker.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository repo;

    @InjectMocks
    private TransactionService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private Transaction make(String type, double amount, String category) {
        Transaction t = new Transaction();
        t.setTitle("Test");
        t.setAmount(amount);
        t.setType(type);
        t.setCategory(category);
        t.setDate(LocalDate.now());
        return t;
    }

    @Test
    void testCorrectBalanceCalculation() {
        when(repo.findAll()).thenReturn(List.of(
            make("INCOME", 50000, "Salary"),
            make("EXPENSE", 12000, "Rent")
        ));
        Map<String, Double> summary = service.getSummary();
        assertEquals(50000.0, summary.get("totalIncome"));
        assertEquals(12000.0, summary.get("totalExpense"));
        assertEquals(38000.0, summary.get("balance"));
    }

    @Test
    void testEmptyTransactions() {
        when(repo.findAll()).thenReturn(List.of());
        Map<String, Double> summary = service.getSummary();
        assertEquals(0.0, summary.get("balance"));
    }

    @Test
    void testOnlyExpenses() {
        when(repo.findAll()).thenReturn(List.of(
            make("EXPENSE", 5000, "Food"),
            make("EXPENSE", 3000, "Transport")
        ));
        Map<String, Double> summary = service.getSummary();
        assertEquals(0.0, summary.get("totalIncome"));
        assertEquals(8000.0, summary.get("totalExpense"));
        assertEquals(-8000.0, summary.get("balance"));
    }

    @Test
    void testDeleteExistingTransaction() {
        when(repo.existsById(1L)).thenReturn(true);
        assertDoesNotThrow(() -> service.deleteTransaction(1L));
        verify(repo, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteNonExistingTransaction() {
        when(repo.existsById(99L)).thenReturn(false);
        assertThrows(com.finance.tracker.exception.TransactionNotFoundException.class,
                () -> service.deleteTransaction(99L));
        verify(repo, never()).deleteById(any());
    }

    // ✅ Bug#6 fix test: verify category is normalized to Title Case on add
    @Test
    void testCategoryNormalizedOnAdd() {
        Transaction t = make("EXPENSE", 500, "food"); // lowercase input
        when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));
        Transaction saved = service.addTransaction(t);
        assertEquals("Food", saved.getCategory()); // should be Title Case
    }

    // ✅ Bug#6 fix test: getSummaryByCategory groups same category regardless of case
    @Test
    void testSummaryByCategoryIsCaseInsensitive() {
        when(repo.findAll()).thenReturn(List.of(
            make("EXPENSE", 300, "food"),
            make("EXPENSE", 200, "Food"),
            make("EXPENSE", 100, "FOOD")
        ));
        Map<String, Double> result = service.getSummaryByCategory();
        // All three should collapse into one "Food" key
        assertEquals(1, result.size());
        assertEquals(600.0, result.get("Food"));
    }
}
