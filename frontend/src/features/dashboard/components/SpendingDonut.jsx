import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { groupByCategory, getCategoryConfig } from '../../../shared/utils/formatters';
import Card from '../../../shared/components/Card/Card';

const SpendingDonut = ({ transactions }) => {
  const grouped = groupByCategory(transactions);
  const data = Object.entries(grouped).map(([cat, val]) => {
    const cfg = getCategoryConfig(cat);
    return { name: cfg.label, value: val, color: cfg.color };
  });

  // ✅ Fix #6: empty state guard — prevents blank render when no debit transactions exist
  if (data.length === 0) {
    return (
      <Card>
        <h2 className="chart-title">Spending Breakdown</h2>
        <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          No spending data yet
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="chart-title">Spending Breakdown</h2>
      <ResponsiveContainer width="100%" height={230}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
            {data.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.8rem' }}
            formatter={(v) => [`₹${v.toLocaleString('en-IN')}`]}
          />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: '0.76rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SpendingDonut;
