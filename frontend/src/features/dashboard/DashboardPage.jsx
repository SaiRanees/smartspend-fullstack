import useDashboard   from './hooks/useDashboard';
import SummaryCards   from './components/SummaryCards';
import TrendChart     from './components/TrendChart';
import SpendingDonut  from './components/SpendingDonut';
import RecentActivity from './components/RecentActivity';
import './styles/dashboard.css';

const DashboardPage = () => {
  const { transactions, totals, savingsRate, isLoading } = useDashboard();

  if (isLoading) return <p className="page-loader">Loading your finances…</p>;

  return (
    <div className="dashboard-page page-enter">
      <SummaryCards totals={totals} savingsRate={savingsRate} />
      <div className="dashboard-page__charts">
        <TrendChart transactions={transactions} />
        <SpendingDonut transactions={transactions} />
      </div>
      <RecentActivity transactions={transactions} />
    </div>
  );
};

export default DashboardPage;