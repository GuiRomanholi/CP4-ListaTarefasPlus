import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../auth/AuthContext';

export type RootStackParamList = { Login: undefined; Cadastro: undefined; Home: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  const { mode } = useTheme();
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <NavigationContainer theme={mode === 'dark' ? NavDarkTheme : NavDefaultTheme}>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
