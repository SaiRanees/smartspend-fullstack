import { useState } from 'react';
import Modal  from '../../../shared/components/Modal/Modal';
import Button from '../../../shared/components/Button/Button';
import CATEGORIES from '../../../shared/constants/categories';

const getEmpty = () => ({
  description: '',
  amount: '',
  category: 'food',
  type: 'debit',
  date: new Date().toISOString().split('T')[0],
});

const AddTransactionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState(getEmpty);
  const [errors, setErrors] = useState({});

  const set = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const amount = form.type === 'debit' ? -Math.abs(+form.amount) : +Math.abs(+form.amount);
    onAdd({ ...form, amount });
    onClose();
  };

  return (
    <Modal
      title="Add Transaction"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost"   onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Transaction</Button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label">Description</label>
        <input name="description" value={form.description} onChange={set} className={`form-input${errors.description ? ' form-input--error' : ''}`} placeholder="e.g. Swiggy Order" autoFocus />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Amount (₹)</label>
        <input name="amount" type="number" min="0" value={form.amount} onChange={set} className={`form-input${errors.amount ? ' form-input--error' : ''}`} placeholder="0" />
        {errors.amount && <span className="form-error">{errors.amount}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select name="category" value={form.category} onChange={set} className="form-input">
          {CATEGORIES.filter((c) => c.id !== 'income').map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Type</label>
        <select name="type" value={form.type} onChange={set} className="form-input">
          <option value="debit">Debit — Expense</option>
          <option value="credit">Credit — Income</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input name="date" type="date" value={form.date} onChange={set} className="form-input" />
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
