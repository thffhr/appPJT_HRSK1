/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React, {Component} from 'react';
// import {StyleSheet, AsyncStorage} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import SplashScreen from 'react-native-splash-screen';
// import Login from './screens/Account/login';
// import Signup from './screens/Account/signup';
// import Profile from './screens/Account/profile';
// import Startsex from './screens/Account/start_sex';
// import Startinfo from './screens/Account/start_info';
// import Record from './screens/Record/record';
// import Rank from './screens/Rank/rank';
// import Community from './screens/Community/community';
// import CreateSelect from './screens/Community/create_select';
// import CreateArticle from './screens/Community/create_article';
// import Home from './screens/home';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//     };
//   }
//   async componentDidMount() {
//     SplashScreen.hide();
//     // you might want to do the I18N setup here
//     const username = await AsyncStorage.getItem('username');
//     if (username !== null) {
//       this.setState({isLoggedIn: true});
//     }
//   }
//   render() {
//     return (
//       <NavigationContainer style={styles.container}>
//         <Stack.Navigator
//           initialRouteName="Login"
//           screenOptions={{
//             headerShown: false,
//           }}>
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{title: '로그인'}}
//           />
//           <Stack.Screen
//             name="Signup"
//             component={Signup}
//             options={{title: '회원가입'}}
//           />
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{title: '하루세끼'}}
//           />
//           <Stack.Screen
//             name="Record"
//             component={Record}
//             options={{title: '내 기록'}}
//           />
//           <Stack.Screen
//             name="Profile"
//             component={Profile}
//             options={{title: '프로필'}}
//           />
//           <Stack.Screen
//             name="Startsex"
//             component={Startsex}
//             options={{title: '성별입력'}}
//           />
//           <Stack.Screen
//             name="Startinfo"
//             component={Startinfo}
//             options={{title: '정보입력'}}
//           />
//           <Stack.Screen
//             name="Rank"
//             component={Rank}
//             options={{title: '랭킹페이지'}}
//           />
//           <Stack.Screen
//             name="Community"
//             component={Community}
//             options={{title: '커뮤니티'}}
//           />
//           <Stack.Screen
//             name="CreateSelect"
//             component={CreateSelect}
//             options={{title: '사진선택'}}
//           />
//           <Stack.Screen
//             name="CreateArticle"
//             component={CreateArticle}
//             options={{title: '게시물작성'}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
// });

// export default App;

// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SplashScreen from 'react-native-splash-screen';
import Login from './screens/Account/login';
import Signup from './screens/Account/signup';
import Profile from './screens/Account/profile';
import Startsex from './screens/Account/start_sex';
import Startinfo from './screens/Account/start_info';
import Record from './screens/Record/record';
import Rank from './screens/Rank/rank';
import Community from './screens/Community/community';
import CreateSelect from './screens/Community/create_select';
import CreateArticle from './screens/Community/create_article';
import Home from './screens/home';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const NavigationDrawerStructure = (props) => {
//   //Structure for the navigatin Drawer
//   const toggleDrawer = () => {
//     //Props to open/close the drawer
//     props.navigationProps.toggleDrawer();
//   };

//   return (
//     <View style={{flexDirection: 'row'}}>
//       <TouchableOpacity onPress={() => toggleDrawer()}>
//         {/*Donute Button Image */}
//         <Image
//           source={{
//             uri:
//               'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
//           }}
//           style={{
//             width: 25,
//             height: 25,
//             marginLeft: 5,
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '로그인',
          // headerLeft: () => (
          //   <NavigationDrawerStructure navigationProps={navigation} />
          // ),
          // headerStyle: {
          //   backgroundColor: '#f4511e', //Set Header color
          // },
          // headerTintColor: '#fff', //Set Header text color
          // headerTitleStyle: {
          //   fontWeight: 'bold', //Set Header text style
          // },
        }}
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
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Community"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '로그인',
        }}
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
  );
}

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };
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
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }}>
          <Drawer.Screen
            name="FirstPage"
            options={{drawerLabel: '로그인'}}
            component={firstScreenStack}
          />
          <Drawer.Screen
            name="SecondPage"
            options={{drawerLabel: '커뮤니티'}}
            component={secondScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
