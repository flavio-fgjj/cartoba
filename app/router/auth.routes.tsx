import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// pages and components
import SignInScreen from '@screens/signIn';
import { Home } from '@screens/home';

// store
import { useTokenStore } from '../store/token';

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();

  const token = useTokenStore(state => state);

  return (
    <Stack.Navigator>
      {token.token 
      ? <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      /> 
      : <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignInScreen}
      />
    }
      
    </Stack.Navigator>
  );
};

export default AuthRoutes;