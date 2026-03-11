import { getCategoryConfig, formatCurrency, budgetPercent } from '../../../shared/utils/formatters';
import Card   from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import './BudgetCard.css';

const BudgetCard = ({ budget, spent, onEdit }) => {
  const cfg     = getCategoryConfig(budget.category);
  const pct     = budgetPercent(spent, budget.limit);
  const status  = pct >= 90 ? 'over' : pct >= 70 ? 'warn' : 'ok';
  const statusLabel = { over: '🚨 Over budget!', warn: '⚠️ Near limit', ok: '✅ On track' };

  return (
    <Card className="budget-card">
      <div className="budget-card__top">
        <div className="budget-card__icon" style={{ background: cfg.color + '1a', color: cfg.color }}>{cfg.icon}</div>
        <div className="budget-card__meta">
          <span className="budget-card__name">{cfg.label}</span>
          <span className="budget-card__nums">
            <strong style={{ color: cfg.color }}>{formatCurrency(spent)}</strong>
            <span className="budget-card__limit"> / {formatCurrency(budget.limit)}</span>
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onEdit(budget)}>Edit</Button>
      </div>

      <div className="budget-card__bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${cfg.label} budget ${pct}% used`}>
        <div className="budget-card__bar-fill" style={{ width: `${pct}%`, background: cfg.color }} />
      </div>

      <div className="budget-card__footer">
        <span className={`budget-card__status budget-card__status--${status}`}>{statusLabel[status]}</span>
        <span className="budget-card__pct">{pct}% used</span>
      </div>
    </Card>
  );
};

export default BudgetCard;
