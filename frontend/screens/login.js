import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {CommonActions} from '@react-navigation/native';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }
  handleEmail = (text) => {
    this.setState({username: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  onLogin = () => {
    fetch('http://10.0.2.2:8080/rest-auth/login/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.key) {
          AsyncStorage.setItem('auth-token', response.key);
          AsyncStorage.setItem('username', this.state.username);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
        } else {
          alert('계정 정보가 일치하지 않습니다.');
        }
      })
      .catch((err) => console.error(err));
  };
  onSign = () => {
    this.props.navigation.push('Signup');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleGroup}>
        <Image
            source={
              require('../assets/images/로고.png')
            }
            style={styles.image}/>
        <Text style={styles.title}>하루세끼</Text>
            </View>
        <View>
          <TextInput
            style={styles.inputArea}
            placeholder="아이디를 입력하세요."
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
          </View>
          <View style={styles.loginBtn}>
            <TouchableOpacity onPress={this.onLogin} >
              <Text style={styles.loginBtnText}>로그인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.findBox}>
            <TouchableOpacity style={styles.findBtn} color="transparent">
              <Text>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>|</Text>
            <TouchableOpacity style={styles.findBtn}>
              <Text>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupBox}>
            <Text style={{textAlign: 'center', marginBottom: 3}}>
              가입이 되어 있지 않으신가요?
            </Text>
            <TouchableOpacity style={styles.signupBtn} onPress={this.onSign}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBE6',
  },
  titleGroup: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 50,
    fontFamily: "BMJUAz",
    marginBottom: 50,
    marginTop: 5,
  },
  image: {
    marginRight: 10,
    width: 60,
    height: 60,
  },
  inputArea: {
    width: 300,
    height: 40,
    borderBottomColor: 'gray',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#fca652',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  findBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  findBtn: {
    backgroundColor: 'transparent',
    color: 'red',
    marginHorizontal: 10,
  },
  signupBox: {
    marginTop: 60,
  },
  signupBtn: {
    backgroundColor: 'transparent',
    color: 'blue',
    alignItems: 'center',
  },
});

export default Login;
