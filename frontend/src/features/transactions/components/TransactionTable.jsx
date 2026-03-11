import { formatCurrency, formatDate, getCategoryConfig } from '../../../shared/utils/formatters';
import Button from '../../../shared/components/Button/Button';
import Card   from '../../../shared/components/Card/Card';
import './TransactionTable.css';

// ✅ Fix #4: function component to handle async delete with error catching
const TransactionTable = ({ transactions, onDelete }) => {
  const handleDelete = async (id, description) => {
    try {
      await onDelete(id);
    } catch {
      alert(`Could not delete "${description}". Please try again.`);
    }
  };

  return (
    <Card noPad>
      <table className="txn-table" role="table" aria-label="Transactions list">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan={5} className="txn-table__empty">No transactions match your filters</td></tr>
          ) : transactions.map((t) => {
            const cfg = getCategoryConfig(t.category);
            return (
              <tr key={t.id}>
                <td className="txn-table__desc-cell">
                  <span className="txn-table__icon" style={{ background: cfg.color + '1a', color: cfg.color }}>{cfg.icon}</span>
                  <span className="txn-table__desc">{t.description}</span>
                </td>
                <td><span className="txn-table__badge" style={{ color: cfg.color, background: cfg.color + '15' }}>{cfg.label}</span></td>
                <td className="txn-table__date">{formatDate(t.date)}</td>
                <td className={`txn-table__amount txn-table__amount--${t.type}`}>
                  {t.type === 'credit' ? '+' : '−'}{formatCurrency(t.amount)}
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t.id, t.description)} ariaLabel={`Delete ${t.description}`}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default TransactionTable;
