import { useLocation } from 'react-router-dom';
import './Topbar.css';

const PAGE_META = {
  '/':             { title: 'Dashboard',      sub: 'Your complete financial overview' },
  '/transactions': { title: 'Transactions',   sub: 'Add, view, filter every transaction' },
  '/budget':       { title: 'Budget Planner', sub: 'Set limits and track your spending' },
  '/insights':     { title: 'AI Insights',    sub: 'Personalized analysis powered by AI' },
};

const Topbar = () => {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || { title: 'SmartSpend', sub: '' };
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header className="topbar" role="banner">
      <div className="topbar__page">
        <h1 className="topbar__title">{meta.title}</h1>
        <p  className="topbar__sub">{meta.sub}</p>
      </div>
      <div className="topbar__right">
        <span className="topbar__date" aria-label="Today's date">{today}</span>
        <div className="topbar__badge">Live</div>
      </div>
    </header>
  );
};

export default Topbar;
