import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { StackNavigator } from 'react-navigation';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  };
  handleEmail = text => {
    this.setState({ username: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  onLogin = () => {
    fetch('http://10.0.2.2:8080/rest-auth/login/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('로그인 성공')
        console.log(response)
        AsyncStorage.setItem('auth-token',response.key)
        AsyncStorage.setItem('username',this.state.username)
        this.props.navigation.push('Home')
      })
      .catch(err => console.error(err))
    
  };
  onSign = () => {
    this.props.navigation.push('Signup')
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <View>
          <TextInput
            style={styles.inputArea}
            placeholder="이메일을 입력하세요."
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
          <TouchableOpacity
            onPress={this.onLogin}
            style={styles.loginBtn}
          >
          <Text>로그인</Text>
          </TouchableOpacity>
          <View style={styles.findBox}>
            <TouchableOpacity
              style={styles.findBtn}
              color="transparent"
            >
            <Text>아이디 찾기 | </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.findBtn}
            >
            <Text>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupBox}>
            <Text>가입이 되어 있지 않으신가요?</Text>
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={this.onSign}
            >
            <Text>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: 5, 
    marginBottom: 5,
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#F1C40F',
  },
  findBox: {
    flexDirection: 'row',
  },
  findBtn: {
    backgroundColor: 'transparent',
    color: 'red',
  },
  signupBox: {
    marginTop: 70,
  },
  signupBtn: {
    backgroundColor: 'transparent',
    color: 'blue',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default Login;
