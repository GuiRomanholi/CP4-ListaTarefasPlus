import 'react-native-gesture-handler';
import RootNavigation from './app/navigation';
import { ThemeProvider } from './app/theme/ThemeContext';
import { AuthProvider } from './app/auth/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}