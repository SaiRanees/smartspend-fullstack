import Card from '../Card/Card';
import './StatCard.css';

const StatCard = ({ label, value, icon, accent, sub }) => (
  <Card className="stat-card">
    <div className="stat-card__icon" style={{ background: accent + '18', color: accent }}>
      {icon}
    </div>
    <div className="stat-card__content">
      <p   className="stat-card__label">{label}</p>
      <p   className="stat-card__value" style={{ color: accent }}>{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  </Card>
);

export default StatCard;
