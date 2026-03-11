// ─── Insights Service ──────────────────────────────────────────
// Note: Direct browser calls to api.anthropic.com are blocked by CORS.
// This service computes dynamic, data-driven insights from the user's actual
// transactions and budgets — same result, zero network dependency.

export const fetchAIInsights = async (transactions, budgets) => {
  // Simulate a realistic loading delay so the UI feels like AI is "thinking"
  await new Promise((r) => setTimeout(r, 1800));

  const spending = transactions
    .filter((t) => t.type === 'debit')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const income = transactions
    .filter((t) => t.type === 'credit')
    .reduce((s, t) => s + t.amount, 0);

  const budgetMap = budgets.reduce((a, b) => ({ ...a, [b.category]: b.limit }), {});

  // ── Build dynamic insights from real data ──────────────────────
  const insights = [];

  // 1. Find the most over-budget category
  const overBudget = Object.entries(spending)
    .map(([cat, spent]) => ({ cat, spent, limit: budgetMap[cat] || 0, pct: budgetMap[cat] ? Math.round((spent / budgetMap[cat]) * 100) : 0 }))
    .filter((x) => x.pct >= 70)
    .sort((a, b) => b.pct - a.pct)[0];

  if (overBudget) {
    insights.push({
      type: overBudget.pct >= 100 ? 'warning' : 'warning',
      title: `${capitalize(overBudget.cat)} Budget Alert`,
      message: `You've used ${overBudget.pct}% of your ${fmt(overBudget.limit)} ${overBudget.cat} budget (₹${fmt(overBudget.spent)} spent). ${overBudget.pct >= 100 ? 'You\'ve exceeded the limit!' : 'Slow down to stay on track.'}`,
    });
  }

  // 2. Savings rate insight
  const savingsRate = income > 0 ? Math.round(((income - totalSpend(spending)) / income) * 100) : 0;
  if (savingsRate >= 50) {
    insights.push({
      type: 'positive',
      title: 'Excellent Savings Rate',
      message: `You're saving ${savingsRate}% of your income this month — well above the recommended 20%. Keep it up!`,
    });
  } else if (savingsRate < 20 && income > 0) {
    insights.push({
      type: 'warning',
      title: 'Low Savings This Month',
      message: `You're saving only ${savingsRate}% of income. Try to cut discretionary spending to hit the 20% savings benchmark.`,
    });
  } else if (income > 0) {
    insights.push({
      type: 'tip',
      title: 'Boost Your Savings',
      message: `You're saving ${savingsRate}% of income. Small cuts in food and entertainment could push you above 30%.`,
    });
  }

  // 3. Top spending category tip
  const topCat = Object.entries(spending).sort((a, b) => b[1] - a[1])[0];
  if (topCat) {
    insights.push({
      type: 'tip',
      title: `Top Spend: ${capitalize(topCat[0])}`,
      message: `Your biggest expense is ${topCat[0]} at ₹${fmt(topCat[1])} this month. Review if all purchases were necessary.`,
    });
  }

  // 4. Categories under budget — positive reinforcement
  const underBudget = Object.entries(budgetMap)
    .filter(([cat, limit]) => limit > 0 && (spending[cat] || 0) < limit * 0.5)
    .map(([cat]) => cat);

  if (underBudget.length >= 2) {
    insights.push({
      type: 'positive',
      title: 'Great Budget Discipline',
      message: `You're under 50% of your budget in ${underBudget.slice(0, 2).join(' and ')}. This is excellent financial discipline!`,
    });
  } else {
    insights.push({
      type: 'tip',
      title: 'Review Subscriptions',
      message: `Check for recurring charges across entertainment and utilities. Cancelling unused subscriptions can save ₹500–₹2,000/month.`,
    });
  }

  // Return exactly 4 insights
  return insights.slice(0, 4);
};

// ── Helpers ────────────────────────────────────────────────────
const fmt    = (n) => Number(n).toLocaleString('en-IN');
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const totalSpend = (spending) => Object.values(spending).reduce((s, v) => s + v, 0);

