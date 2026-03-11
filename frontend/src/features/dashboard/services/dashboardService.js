import { apiFetch } from '../../../shared/utils/api';

export const fetchDashboardData = async () => {
  const [transactions, categoryBreakdown] = await Promise.all([
    apiFetch('/transactions'),
    apiFetch('/transactions/summary/category'),
  ]);

  const normalized = normalizeTransactions(transactions);
  const budgets    = buildBudgets(categoryBreakdown);

  // monthlyTrends computed in useDashboard hook from live state — not here
  return { transactions: normalized, monthlyTrends: [], budgets };
};

// ─── Helpers ──────────────────────────────────────────────────

const normalizeTransactions = (transactions) =>
  transactions.map((t) => ({
    id:          t.id,
    date:        extractDateString(t.date), // always store as "YYYY-MM-DD" string
    description: t.title,
    amount:      t.type === 'EXPENSE' ? -Math.abs(t.amount) : t.amount,
    category:    mapCategory(t.category),
    type:        t.type === 'INCOME' ? 'credit' : 'debit',
  }));

// Handles both "2026-03-01" string AND [2026, 3, 1] array from backend
const extractDateString = (date) => {
  if (!date) return null;
  if (Array.isArray(date)) {
    // Spring Boot LocalDate serialized as array [year, month, day]
    const [y, m, d] = date;
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  return String(date); // already a string
};

export const mapCategory = (cat = '') => {
  const map = {
    'food': 'food', 'salary': 'income', 'income': 'income',
    'rent': 'utilities', 'housing': 'utilities',
    'transport': 'transport', 'shopping': 'shopping',
    'entertainment': 'entertainment', 'health': 'health',
    'utilities': 'utilities', 'education': 'shopping',
    'freelance': 'income', 'grocery': 'food',
  };
  return map[cat.toLowerCase()] || cat.toLowerCase();
};

const buildBudgets = (categoryBreakdown) => {
  const defaults = {
    food: 5000, transport: 3000, shopping: 8000,
    entertainment: 3000, health: 4000, utilities: 3000,
  };
  Object.entries(categoryBreakdown).forEach(([cat, spent]) => {
    const key = mapCategory(cat);
    if (key !== 'income' && spent > 0) {
      defaults[key] = Math.max(defaults[key] || 0, Math.round(spent * 1.3));
    }
  });
  return Object.entries(defaults).map(([category, limit]) => ({ category, limit }));
};