import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider }  from './core/theme/ThemeProvider';
import { AppStoreProvider } from './core/store/AppStore';
import AppLayout          from './layout/AppLayout/AppLayout';
import AppRouter          from './core/router/AppRouter';
import './shared/styles/globals.css';

// Import shared Modal styles globally (used by multiple features)
import './shared/components/Modal/Modal.css';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AppStoreProvider>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </AppStoreProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
