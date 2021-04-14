import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import AddEntry from './components/AddEntry';
import reducer from './reducers'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import { purple, white } from './utils/colors'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon
        if (route.name === 'Add Entry') {
          icon = (
            <FontAwesome name="plus-square" size={size} color={color} />
          )
        } else if (route.name === 'History') {
          icon = (
            <Ionicons name="ios-bookmarks" size={size} color={color} />
          )
        }
        return icon
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        backgroundColor: Platform.OS === 'ios' ? white : purple,
      },
      indicatorStyle: {
        // Android tab indicator (line at the bottom of the tab)
        backgroundColor: 'yellow',
      },
    }}
  >
    <Tab.Screen name="History" component={History} />
    <Tab.Screen name="Add Entry" component={AddEntry} />
  </Tab.Navigator>
)

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{headerShown: false}}/>
    <Stack.Screen
      name="EntryDetail"
      component={EntryDetail}
      options={{
        headerTintColor: white, 
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }/>
  </Stack.Navigator>
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={purple} style="light" />
          <MainNav />
        </NavigationContainer>
      </Provider>
    );
  }
}