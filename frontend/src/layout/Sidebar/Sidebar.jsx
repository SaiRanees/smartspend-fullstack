import { NavLink } from 'react-router-dom';
import ROUTES from '../../shared/constants/routes';
import { useTheme } from '../../core/theme/ThemeProvider';
import './Sidebar.css';

const NAV = [
  { path: ROUTES.DASHBOARD,    label: 'Dashboard',    icon: '📊' },
  { path: ROUTES.TRANSACTIONS, label: 'Transactions', icon: '💳' },
  { path: ROUTES.BUDGET,       label: 'Budget',       icon: '🎯' },
  { path: ROUTES.INSIGHTS,     label: 'AI Insights',  icon: '🤖' },
];

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon">💸</span>
        <span className="sidebar__brand-name">SmartSpend</span>
      </div>

      {/* Nav Links */}
      <nav className="sidebar__nav">
        {NAV.map(({ path, label, icon }) => (
          <NavLink
            key={path} to={path} end={path === '/'}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <span className="sidebar__link-icon" aria-hidden="true">{icon}</span>
            <span className="sidebar__link-text">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar__bottom">
        <button
          className="sidebar__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div className="sidebar__user">
          <div className="sidebar__avatar">S</div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">Sai Mohan</p>
            <p className="sidebar__user-role">Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
