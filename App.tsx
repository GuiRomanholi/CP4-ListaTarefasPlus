import 'react-native-gesture-handler';
import RootNavigation from './app/navigation';
import { ThemeProvider } from './app/theme/ThemeContext';
import { AuthProvider } from './app/auth/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
