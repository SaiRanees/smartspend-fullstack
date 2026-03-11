import useInsights  from './hooks/useInsights';
import InsightCard  from './components/InsightCard';
import Card         from '../../shared/components/Card/Card';
import Button       from '../../shared/components/Button/Button';
import './components/InsightCard.css';
import './styles/insights.css';

const InsightsPage = () => {
  const { insights, status, loadInsights } = useInsights();

  return (
    <div className="insights-page page-enter">

      {/* Hero — shown before first load */}
      {status === 'idle' && (
        <Card className="insights-hero" glow>
          <div className="insights-hero__inner">
            <span className="insights-hero__emoji">🤖</span>
            <h2 className="insights-hero__title">AI Financial Analysis</h2>
            <p  className="insights-hero__desc">
              Powered by Claude AI — analyzes your actual spending, compares against your
              budgets, and surfaces personalized tips, just like Credit Karma.
            </p>
            <Button variant="primary" size="lg" onClick={loadInsights}>
              ✨ Generate My Insights
            </Button>
          </div>
        </Card>
      )}

      {/* Loading skeletons */}
      {status === 'loading' && (
        <div className="insights-grid">
          {[1,2,3,4].map((i) => <div key={i} className="skeleton insights-skeleton" />)}
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <Card>
          <div style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>⚠️</span>
            <p style={{ color: 'var(--color-text-soft)' }}>Something went wrong. Please try again.</p>
            <Button variant="ghost" onClick={loadInsights}>Retry</Button>
          </div>
        </Card>
      )}

      {/* Results */}
      {status === 'done' && (
        <>
          <div className="insights-grid">
            {insights.map((ins, i) => (
              <InsightCard key={i} type={ins.type} title={ins.title} message={ins.message} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Button variant="ghost" onClick={loadInsights}>🔄 Refresh Analysis</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightsPage;
