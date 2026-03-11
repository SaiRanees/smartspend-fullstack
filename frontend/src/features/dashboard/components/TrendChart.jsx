import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../../../shared/components/Card/Card';
import './TrendChart.css';

const TrendChart = ({ transactions }) => {
  // Anchor to the most recent transaction's month, not today's date
  let anchorYear, anchorMonth;

  if (transactions.length > 0) {
    const dates = transactions
      .filter((t) => t.date)
      .map((t) => {
        const parts = String(t.date).split('-');
        return { year: parseInt(parts[0]), month: parseInt(parts[1]) - 1 };
      })
      .sort((a, b) => b.year - a.year || b.month - a.month);
    anchorYear  = dates[0].year;
    anchorMonth = dates[0].month;
  } else {
    const now   = new Date();
    anchorYear  = now.getFullYear();
    anchorMonth = now.getMonth();
  }

  // Build last 6 months going back from anchor
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(anchorYear, anchorMonth - i, 1);
    months.push({
      month:    d.toLocaleString('en-IN', { month: 'short' }),
      year:     d.getFullYear(),
      monthNum: d.getMonth(),
      income:   0,
      expenses: 0,
    });
  }

  // Fill in transaction totals
  transactions.forEach((t) => {
    if (!t.date) return;
    const parts = String(t.date).split('-');
    const year  = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;

    const bucket = months.find((m) => m.year === year && m.monthNum === month);
    if (!bucket) return;

    if (t.type === 'credit') {
      bucket.income += t.amount;
    } else {
      bucket.expenses += Math.abs(t.amount);
    }
  });

  return (
    <Card className="trend-chart">
      <h2 className="chart-title">Income vs Expenses — 6 Months</h2>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={months} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.8rem' }}
            formatter={(v) => [`₹${v.toLocaleString('en-IN')}`]}
          />
          <Legend wrapperStyle={{ fontSize: '0.78rem', color: 'var(--color-text-soft)' }} />
          <Line type="monotone" dataKey="income"   stroke="#06d6a0" strokeWidth={2.5} dot={{ r: 3.5 }} name="Income"   />
          <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3.5 }} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrendChart;