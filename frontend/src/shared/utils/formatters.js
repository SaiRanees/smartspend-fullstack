import CATEGORIES from '../constants/categories';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
    .format(Math.abs(amount));

// ✅ Bug#12 fix: parse date as LOCAL time, not UTC
// "2025-03-01" parsed as UTC shows Feb 28 in IST (+5:30) — replace '-' with '/' forces local parse
const parseLocalDate = (dateStr) => {
  if (!dateStr) return new Date(); // ✅ Bug#11 fix: null-safe fallback
  return new Date(String(dateStr).replace(/-/g, '/'));
};

export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    .format(parseLocalDate(dateStr));

export const formatShortDate = (dateStr) =>
  new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' })
    .format(parseLocalDate(dateStr));

export const getCategoryConfig = (id) =>
  CATEGORIES.find((c) => c.id === id) || { label: id, color: '#64748b', icon: '📦' };

export const groupByCategory = (transactions) =>
  transactions
    .filter((t) => t.type === 'debit')
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount); return acc; }, {});

export const calcTotals = (transactions) => {
  const income   = transactions.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
  return { income, expenses, savings: income - expenses };
};

export const budgetPercent = (spent, limit) => {
  if (!limit || limit <= 0) return 0;
  return Math.min(Math.round((spent / limit) * 100), 100);
};
