import { createContext, useContext, useReducer } from 'react';

// ─── Initial State ──────────────────────────────────────────────
const initialState = {
  transactions:  [],
  monthlyTrends: [],
  budgets:       [],
  status:        'idle',   // idle | loading | success | error
  error:         null,
};

// ─── Action Types ───────────────────────────────────────────────
export const ACTIONS = {
  SET_LOADING:         'SET_LOADING',
  SET_DATA:            'SET_DATA',
  SET_ERROR:           'SET_ERROR',
  ADD_TRANSACTION:     'ADD_TRANSACTION',
  DELETE_TRANSACTION:  'DELETE_TRANSACTION',
  UPDATE_BUDGET:       'UPDATE_BUDGET',
};

// ─── Reducer ────────────────────────────────────────────────────
const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_LOADING:
      return { ...state, status: 'loading' };
    case ACTIONS.SET_DATA:
      return { ...state, ...payload, status: 'success' };
    case ACTIONS.SET_ERROR:
      return { ...state, error: payload, status: 'error' };
    case ACTIONS.ADD_TRANSACTION:
      return { ...state, transactions: [payload, ...state.transactions] };
    case ACTIONS.DELETE_TRANSACTION:
      return { ...state, transactions: state.transactions.filter((t) => t.id !== payload) };
    case ACTIONS.UPDATE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map((b) => b.category === payload.category ? payload : b),
      };
    default:
      return state;
  }
};

// ─── Context ────────────────────────────────────────────────────
const AppStoreContext = createContext(null);

export const AppStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────────
export const useAppStore = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppStoreProvider');
  return ctx;
};
