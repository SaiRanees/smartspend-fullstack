import { useState, useMemo } from 'react';
import { useAppStore, ACTIONS } from '../../../core/store/AppStore';
import { addTransactionAPI, deleteTransactionAPI } from '../services/transactionService';

const useTransactions = () => {
  const { state, dispatch } = useAppStore();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');
  const [type,     setType]     = useState('all');

  // Derived: filtered list
  const filtered = useMemo(() => {
    return state.transactions.filter((t) => {
      const matchSearch   = t.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || t.category === category;
      const matchType     = type === 'all'     || t.type === type;
      return matchSearch && matchCategory && matchType;
    });
  }, [state.transactions, search, category, type]);

  const addTransaction = async (data) => {
    const newT = await addTransactionAPI(data);
    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: newT });
  };

  const deleteTransaction = async (id) => {
    await deleteTransactionAPI(id);
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  };

  return {
    filtered,
    search, setSearch,
    category, setCategory,
    type, setType,
    addTransaction,
    deleteTransaction,
    isLoading: state.status === 'idle' || state.status === 'loading',
  };
};

export default useTransactions;
