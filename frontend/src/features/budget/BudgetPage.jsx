import { useState } from 'react';
import useBudget  from './hooks/useBudget';
import BudgetCard from './components/BudgetCard';
import Modal      from '../../shared/components/Modal/Modal';
import Button     from '../../shared/components/Button/Button';
import { getCategoryConfig } from '../../shared/utils/formatters';
import './components/BudgetCard.css';
import './styles/budget.css'; // ✅ was missing — contains budget-page__grid

const BudgetPage = () => {
  const { budgets, spentMap, updateBudget, isLoading } = useBudget();
  const [editing, setEditing] = useState(null);
  const [newLimit, setNewLimit] = useState('');

  const openEdit  = (b)  => { setEditing(b); setNewLimit(b.limit); };
  const saveEdit  = ()   => { if (newLimit) updateBudget(editing.category, newLimit); setEditing(null); };

  if (isLoading) return <p className="page-loader">Loading budgets…</p>;

  return (
    <div className="budget-page page-enter">
      <div className="budget-page__grid">
        {budgets.map((b) => (
          <BudgetCard key={b.category} budget={b} spent={spentMap[b.category] || 0} onEdit={openEdit} />
        ))}
      </div>

      {editing && (
        <Modal
          title={`Edit Budget — ${getCategoryConfig(editing.category).label}`}
          onClose={() => setEditing(null)}
          footer={
            <>
              <Button variant="ghost"   onClick={() => setEditing(null)}>Cancel</Button>
              <Button variant="primary" onClick={saveEdit}>Save Limit</Button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Monthly Limit (₹)</label>
            <input
              type="number" min="0"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BudgetPage;
