/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Loding from './components/loading';
import Login from './screens/login';
import Home from './screens/home';
import Signup from './screens/signup';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  AsyncStorage,
  // StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const userScreens = {
  Home: Home,
};
const authScreens = {
  Login: Login,
  Signup: Signup,
};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  };
  async componentDidMount() {
    // you might want to do the I18N setup here
    const username = await AsyncStorage.getItem('username')
    if (username !== null) {
      this.setState({ isLoggedIn: true })
    }
  }
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          {Object.entries({
            ...(this.state.isLoggedIn ? userScreens : authScreens),
          }).map(([name, component]) => (
            <Stack.Screen name={name} component={component} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//redux
const initialState = {
  counter: 0
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case 'INCREASE_COUNTER': {
      return{counter:state.counter+1}
    }
    case 'DECREASE_COUNTER':
      return{counter:state.counter-1}
  }
  return state
}

export default App;