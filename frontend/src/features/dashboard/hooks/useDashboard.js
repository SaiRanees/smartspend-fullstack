import { useEffect, useRef, useMemo } from 'react';
import { useAppStore, ACTIONS } from '../../../core/store/AppStore';
import { fetchDashboardData }   from '../services/dashboardService';
import { calcTotals }           from '../../../shared/utils/formatters';

const useDashboard = () => {
  const { state, dispatch } = useAppStore();
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  useEffect(() => {
    if (state.status !== 'idle') return;
    const load = async () => {
      dispatchRef.current({ type: ACTIONS.SET_LOADING });
      try {
        const data = await fetchDashboardData();
        dispatchRef.current({ type: ACTIONS.SET_DATA, payload: data });
      } catch (e) {
        dispatchRef.current({ type: ACTIONS.SET_ERROR, payload: e.message });
      }
    };
    load();
  }, [state.status]);

  const monthlyTrends = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      months.push({
        month:    d.toLocaleString('en-IN', { month: 'short' }),
        year:     d.getFullYear(),
        monthNum: d.getMonth(), // 0-indexed: Jan=0, Mar=2
      });
    }

    return months.map(({ month, year, monthNum }) => {
      const txns = state.transactions.filter((t) => {
        if (!t.date) return false;

        let txYear, txMonth;

        if (Array.isArray(t.date)) {
          // Backend sent [2026, 3, 1] array format
          txYear  = t.date[0];
          txMonth = t.date[1] - 1; // convert to 0-indexed
        } else {
          // Backend sent "2026-03-01" string format
          const parts = String(t.date).split('-');
          txYear  = parseInt(parts[0], 10);
          txMonth = parseInt(parts[1], 10) - 1;
        }

        return txMonth === monthNum && txYear === year;
      });

      const income   = txns.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
      const expenses = txns.filter((t) => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
      return { month, income, expenses };
    });
  }, [state.transactions]);

  const totals      = calcTotals(state.transactions);
  const savingsRate = totals.income > 0
    ? Math.round((totals.savings / totals.income) * 100) : 0;

  return {
    transactions:  state.transactions,
    monthlyTrends,
    totals,
    savingsRate,
    isLoading: state.status === 'loading' || state.status === 'idle',
  };
};

export default useDashboard;