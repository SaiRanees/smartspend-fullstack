import CATEGORIES from '../../../shared/constants/categories';
import Button from '../../../shared/components/Button/Button';
import './TransactionFilters.css';

const TransactionFilters = ({ search, setSearch, category, setCategory, type, setType, onAdd }) => (
  <div className="txn-filters">
    <div className="txn-filters__left">
      <input
        className="txn-filters__search"
        placeholder="🔍  Search transactions…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search transactions"
      />
      <select className="txn-filters__select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
      </select>
      <select className="txn-filters__select" value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
        <option value="all">All Types</option>
        <option value="debit">Expenses</option>
        <option value="credit">Income</option>
      </select>
    </div>
    <Button variant="primary" onClick={onAdd}>＋ Add Transaction</Button>
  </div>
);

export default TransactionFilters;
