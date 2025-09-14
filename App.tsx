import 'react-native-gesture-handler';
import RootNavigation from './app/navigation';
import { ThemeProvider } from './app/theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
