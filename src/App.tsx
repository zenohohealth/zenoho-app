import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportUploadPage } from './pages/ReportUploadPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ReportProcessingPage } from './pages/ReportProcessingPage';
import { SupplementsPage } from './pages/SupplementsPage';
import { WearablesPage } from './pages/WearablesPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { BillingPage } from './pages/BillingPage';
import { SettingsPage } from './pages/SettingsPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
import { TopNav } from './components/TopNav';
import { BottomTabBar } from './components/BottomTabBar';
import { Footer } from './components/Footer';

function AppShell() {
  const { session, profile, loading } = useAuth();
  const { route } = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00E5CC]/30 border-t-[#00E5CC] rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <AuthPage />;
  if (!profile?.onboarded_at) return <OnboardingPage />;

  // Processing screen needs full-screen — skip nav/footer
  const isProcessing = route === '/reports/upload' || route.startsWith('/reports/processing/');

  const renderPage = () => {
    if (route === '/reports/upload') return <ReportUploadPage />;
    if (route === '/reports') return <ReportsPage />;
    if (route.startsWith('/reports/processing/')) {
      const panelId = route.replace('/reports/processing/', '');
      return <ReportProcessingPage panelId={panelId} />;
    }
    if (route.startsWith('/reports/')) {
      const panelId = route.replace('/reports/', '');
      return <ReportDetailPage panelId={panelId} />;
    }
    if (route === '/supplements') return <SupplementsPage />;
    if (route === '/wearables') return <WearablesPage />;
    if (route === '/challenges') return <ChallengesPage />;
    if (route === '/billing') return <BillingPage />;
    if (route === '/settings') return <SettingsPage />;
    if (route === '/community') return <CommunityPage />;
    if (route === '/admin') return <AdminPage />;
    return <DashboardPage />;
  };

  if (isProcessing) {
    return renderPage();
  }

  return (
    <div className="min-h-screen bg-[#0D1B35] flex flex-col">
      <TopNav />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-0 pb-16 md:pb-0">
        {renderPage()}
      </main>
      <Footer />
      <BottomTabBar />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
