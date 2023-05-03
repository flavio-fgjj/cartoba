import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

// store
import { useTokenStore } from '../store/token';

const StackNavigator = () => {
  const token = useTokenStore(state => state);

  if (token.token) {
    return (
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    );  
  } else {
    return (
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    );
  }
};

export default StackNavigator;
