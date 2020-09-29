/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import Home from './screens/home';
import Signup from './screens/signup';
import Profile from './screens/profile';
import Startsex from './screens/start_sex';
import Startinfo from './screens/start_info';
import Rank from './screens/rank';
import Community from './screens/community';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  async componentDidMount() {
    // you might want to do the I18N setup here
    const username = await AsyncStorage.getItem('username');
    if (username !== null) {
      this.setState({isLoggedIn: true});
    }
  }
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{title: '회원가입'}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: '하루세끼'}}
          />
          {/* <Stack.Screen
            name="Camera"
            component={Camera}
            options={{title: '카메라'}}
          /> */}
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{title: '프로필'}}
          />
          <Stack.Screen
            name="Startsex"
            component={Startsex}
            options={{title: '성별입력'}}
          />
          <Stack.Screen
            name="Startinfo"
            component={Startinfo}
            options={{title: '정보입력'}}
          />
          <Stack.Screen
            name="Rank"
            component={Rank}
            options={{title: '랭킹페이지'}}
          />
          <Stack.Screen
            name="Community"
            component={Community}
            options={{title: '커뮤니티'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
