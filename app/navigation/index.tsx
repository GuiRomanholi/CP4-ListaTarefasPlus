import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';

type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    };

    const Stack = createNativeStackNavigator<RootStackParamList>();

    export default function RootNavigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}
