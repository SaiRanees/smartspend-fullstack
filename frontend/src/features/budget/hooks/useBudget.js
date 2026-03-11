import { useAppStore, ACTIONS } from '../../../core/store/AppStore';
import { groupByCategory }      from '../../../shared/utils/formatters';
import { updateBudgetAPI }      from '../services/budgetService';

const useBudget = () => {
  const { state, dispatch } = useAppStore();
  const spentMap = groupByCategory(state.transactions);

  const updateBudget = async (category, limit) => {
    const updated = await updateBudgetAPI(category, limit);
    dispatch({ type: ACTIONS.UPDATE_BUDGET, payload: updated });
  };

  return {
    budgets: state.budgets,
    spentMap,
    updateBudget,
    isLoading: state.status === 'idle' || state.status === 'loading',
  };
};

export default useBudget;
