/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Login from './screens/Account/login';
import Signup from './screens/Account/signup';
import Profile from './screens/Account/profile';
import UpdateImg from './screens/Account/updateImg';
import Startsex from './screens/Account/start_sex';
import Startinfo from './screens/Account/start_info';
import Record from './screens/Record/record';
import Rank from './screens/Rank/rank';
import Community from './screens/Community/community';
import Comment from './screens/Community/comment';
import CreateSelect from './screens/Community/create_select';
import CreateArticle from './screens/Community/create_article';
import Home from './screens/home';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  async componentDidMount() {
    SplashScreen.hide();
    // you might want to do the I18N setup here
    const username = await AsyncStorage.getItem('username');
    if (username !== null) {
      this.setState({isLoggedIn: true});
    }
  }
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
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
            name="Record"
            component={Record}
            options={{title: '내 기록'}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{title: '프로필'}}
          />
          <Stack.Screen
            name="UpdateImg"
            component={UpdateImg}
            options={{title: '프로필이미지변경'}}
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
          <Stack.Screen
            name="Comment"
            component={Comment}
            options={{title: '댓글'}}
          />
          <Stack.Screen
            name="CreateSelect"
            component={CreateSelect}
            options={{title: '사진선택'}}
          />
          <Stack.Screen
            name="CreateArticle"
            component={CreateArticle}
            options={{title: '게시물작성'}}
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
