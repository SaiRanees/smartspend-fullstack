import { Routes, Route } from 'react-router-dom';
import ROUTES from '../../shared/constants/routes';

// Feature pages (lazy could be added here for code-splitting)
import DashboardPage    from '../../features/dashboard/DashboardPage';
import TransactionsPage from '../../features/transactions/TransactionsPage';
import BudgetPage       from '../../features/budget/BudgetPage';
import InsightsPage     from '../../features/insights/InsightsPage';

const AppRouter = () => (
  <Routes>
    <Route path={ROUTES.DASHBOARD}    element={<DashboardPage    />} />
    <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
    <Route path={ROUTES.BUDGET}       element={<BudgetPage       />} />
    <Route path={ROUTES.INSIGHTS}     element={<InsightsPage     />} />
  </Routes>
);

export default AppRouter;
