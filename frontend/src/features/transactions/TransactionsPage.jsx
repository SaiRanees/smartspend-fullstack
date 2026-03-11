import { useState } from 'react';
import useTransactions        from './hooks/useTransactions';
import TransactionFilters     from './components/TransactionFilters';
import TransactionTable       from './components/TransactionTable';
import AddTransactionModal    from './components/AddTransactionModal';
import './components/TransactionFilters.css';
import './components/TransactionTable.css';

const TransactionsPage = () => {
  const { filtered, search, setSearch, category, setCategory, type, setType, addTransaction, deleteTransaction, isLoading } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <p className="page-loader">Loading transactions…</p>;

  return (
    <div className="transactions-page page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TransactionFilters
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        type={type} setType={setType}
        onAdd={() => setShowModal(true)}
      />
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
      </p>
      <TransactionTable transactions={filtered} onDelete={deleteTransaction} />
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onAdd={addTransaction} />}
    </div>
  );
};

export default TransactionsPage;
