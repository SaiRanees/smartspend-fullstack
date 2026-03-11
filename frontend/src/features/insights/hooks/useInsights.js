import { useState } from 'react';
import { useAppStore }      from '../../../core/store/AppStore';
import { fetchAIInsights }  from '../services/insightsService';

const useInsights = () => {
  const { state } = useAppStore();
  const [insights, setInsights] = useState([]);
  const [status,   setStatus]   = useState('idle'); // idle | loading | done | error

  const loadInsights = async () => {
    setStatus('loading');
    // ✅ Fix #8: catch errors so status never gets stuck on 'loading'
    try {
      const data = await fetchAIInsights(state.transactions, state.budgets);
      setInsights(data);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return { insights, status, loadInsights };
};

export default useInsights;
