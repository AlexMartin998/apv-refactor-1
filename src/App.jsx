import { PacientesProvider } from './context/PacientesProvider';
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <PacientesProvider>
        <AppRouter />
      </PacientesProvider>
    </AuthProvider>
  );
}

export default App;
