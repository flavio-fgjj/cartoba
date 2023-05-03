// import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabNavigator from '@components/TabNavigator';

const Tab = createBottomTabNavigator();

function AppRoutes() {
  return <TabNavigator />
}

export default AppRoutes;