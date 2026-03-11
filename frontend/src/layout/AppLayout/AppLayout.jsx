import Sidebar from '../Sidebar/Sidebar';
import Topbar  from '../Topbar/Topbar';
import ApiStatusBanner from '../../shared/components/ApiStatusBanner/ApiStatusBanner';
import '../../shared/components/ApiStatusBanner/ApiStatusBanner.css';
import { useAppStore }  from '../../core/store/AppStore';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const { state } = useAppStore();
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__shell">
        <Topbar />
        <ApiStatusBanner status={state.status} />
        <main className="app-layout__main" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
