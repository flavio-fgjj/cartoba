import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// pages and components
import { Home } from '@screens/home';
import MyTeam from '@screens/myTeam';
import Games from '@screens/games';
import Players from '@screens/players';
import HeaderHome from '@components/HeaderHome';
import Header from '@components/Header';

// styles
import { styles } from './styles';

// util
import { hp } from 'app/utils/adjustments';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarShowLabel: false,

        tabBarStyle: styles.styleTabBar,

        headerStyle: styles.stylesHeader,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}    
    >
      <Tab.Screen
        name="Cartóba"
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
              // if(focused){
              //   return <Icon name={'home'} size={size} color={color} />
              // }

              return <Icon name="home-outline" size={hp(size)} color={color} />
          }, 
          headerTitle: (props) => <HeaderHome />

        }}
      />
      <Tab.Screen
        name="Meu time"
        component={MyTeam}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
              return <Icon name="tshirt-crew" size={hp(size)} color={color} />
          },
          headerTitle: (props) => <Header />
        }}
      />
      <Tab.Screen
        name="Minhas Ligas"
        component={Games}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
              return <Icon name="trophy" size={hp(size)} color={color} />
          },
					headerTitle: (props) => <Header />
        }}
      />
      <Tab.Screen
        name="Jogos"
        component={Games}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
              return <Icon name="soccer-field" size={hp(size)} color={color} />
          },
					headerTitle: (props) => <Header />
        }}
      />
      <Tab.Screen
        name="Jogadores"
        component={Players}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
              return <Icon name="shoe-cleat" size={hp(size)} color={color} />
          },
					headerTitle: (props) => <Header />
        }}
      />
    </Tab.Navigator>
	)
}