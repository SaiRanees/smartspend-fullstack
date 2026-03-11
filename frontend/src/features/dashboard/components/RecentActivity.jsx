import { Link } from 'react-router-dom';
import { formatCurrency, formatShortDate, getCategoryConfig } from '../../../shared/utils/formatters';
import Card from '../../../shared/components/Card/Card';
import './RecentActivity.css';

const RecentActivity = ({ transactions }) => (
  <Card>
    <div className="recent__header">
      <h2 className="chart-title" style={{ marginBottom: 0 }}>Recent Activity</h2>
      <Link to="/transactions" className="recent__link">View all →</Link>
    </div>
    <ul className="recent__list">
      {transactions.slice(0, 7).map((t) => {
        const cfg = getCategoryConfig(t.category);
        return (
          <li key={t.id} className="recent__item">
            <div className="recent__icon" style={{ background: cfg.color + '1a', color: cfg.color }}>{cfg.icon}</div>
            <div className="recent__info">
              <span className="recent__desc">{t.description}</span>
              <span className="recent__date">{formatShortDate(t.date)}</span>
            </div>
            <span className={`recent__amount recent__amount--${t.type}`}>
              {t.type === 'credit' ? '+' : '−'}{formatCurrency(t.amount)}
            </span>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default RecentActivity;
