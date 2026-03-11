import './ApiStatusBanner.css';

// ✅ Bug#9 fix: only show banner on error — not during normal initial load
// Showing "Connecting..." on every page load was confusing UX
const ApiStatusBanner = ({ status }) => {
  if (status !== 'error') return null;

  return (
    <div className="api-banner banner--error">
      ⚠️ Cannot reach backend (localhost:8080). Make sure Spring Boot is running.
    </div>
  );
};

export default ApiStatusBanner;
