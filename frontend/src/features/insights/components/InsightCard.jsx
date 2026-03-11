import Card from '../../../shared/components/Card/Card';
import './InsightCard.css';

const TYPE_CONFIG = {
  warning:  { icon: '⚠️', color: 'var(--color-danger)'  },
  tip:      { icon: '💡', color: 'var(--color-primary)' },
  positive: { icon: '✅', color: 'var(--color-accent)'  },
};

const InsightCard = ({ type, title, message }) => {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.tip;
  return (
    <Card className="insight-card" style={{ '--accent-color': cfg.color }}>
      <span className="insight-card__icon">{cfg.icon}</span>
      <div className="insight-card__body">
        <h3 className="insight-card__title" style={{ color: cfg.color }}>{title}</h3>
        <p  className="insight-card__msg">{message}</p>
      </div>
    </Card>
  );
};

export default InsightCard;
