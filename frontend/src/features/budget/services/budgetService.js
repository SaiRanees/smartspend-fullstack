// ─── Budget Service ────────────────────────────────────────────
// Budget limits are managed locally (no backend endpoint needed).
// In production this would call a /api/budgets endpoint.

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export const updateBudgetAPI = async (category, limit) => {
  await delay();
  return { category, limit: Number(limit) };
};
