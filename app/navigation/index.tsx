import { useEffect } from 'react';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../auth/AuthContext';

export type RootStackParamList = { Login: undefined; Cadastro: undefined; Home: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  const { mode } = useTheme();
  const { user, loading } = useAuth();

  useEffect(() => {}, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer theme={mode === 'dark' ? NavDarkTheme : NavDefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
