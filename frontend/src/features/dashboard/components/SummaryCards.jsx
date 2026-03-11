import StatCard from '../../../shared/components/StatCard/StatCard';
import { formatCurrency } from '../../../shared/utils/formatters';
import './SummaryCards.css';

const SummaryCards = ({ totals, savingsRate }) => (
  <section className="summary-cards" aria-label="Financial summary">
    <StatCard label="Total Income"   value={formatCurrency(totals.income)}   icon="💰" accent="var(--color-accent)"   sub="This month" />
    <StatCard label="Total Expenses" value={formatCurrency(totals.expenses)} icon="💳" accent="var(--color-danger)"   sub="This month" />
    <StatCard label="Net Savings"    value={formatCurrency(totals.savings)}  icon="🏦" accent="var(--color-primary)"  sub="Income minus expenses" />
    <StatCard label="Savings Rate"   value={`${savingsRate}%`}               icon="📈" accent="var(--color-warning)"  sub="Of income saved" />
  </section>
);

export default SummaryCards;
