// ─── Transaction Service ───────────────────────────────────────
// All CRUD operations hit the real Spring Boot REST API.

import { apiFetch }    from '../../../shared/utils/api';
import { mapCategory } from '../../dashboard/services/dashboardService';

export const addTransactionAPI = async (transaction) => {
  // ✅ Bug#3 fix: send capitalized category to backend consistently
  // Use a fixed mapping so 'food' → 'Food', 'transport' → 'Transport' etc.
  const payload = {
    title:    transaction.description,
    amount:   Math.abs(transaction.amount),
    category: backendCategory(transaction.category),
    type:     transaction.type === 'credit' ? 'INCOME' : 'EXPENSE',
    date:     transaction.date,
  };

  const saved = await apiFetch('/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Return normalized for frontend — use mapCategory for consistent ids
  return {
    id:          saved.id,
    date:        saved.date,
    description: saved.title,
    amount:      saved.type === 'EXPENSE' ? -Math.abs(saved.amount) : saved.amount,
    category:    mapCategory(saved.category),   // ✅ consistent with dashboardService
    type:        saved.type === 'INCOME' ? 'credit' : 'debit',
  };
};

export const deleteTransactionAPI = async (id) => {
  await apiFetch(`/transactions/${id}`, { method: 'DELETE' });
  return { success: true, id };
};

// ✅ Bug#3 fix: map frontend category ids → properly capitalized backend strings
const backendCategory = (frontendId) => {
  const map = {
    'food':          'Food',
    'transport':     'Transport',
    'shopping':      'Shopping',
    'entertainment': 'Entertainment',
    'health':        'Health',
    'utilities':     'Utilities',
    'income':        'Income',
  };
  return map[frontendId] || capitalizeFirst(frontendId);
};

const capitalizeFirst = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);
