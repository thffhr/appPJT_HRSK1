import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AsyncStorage} from 'react-native';

// const serverUrl = 'http:10.0.2.2:8080/'

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signupData: {
        username: '',
        email: '',
        password1: '',
        password2: '',
      },
    };
  }
  onSignup = () => {
    fetch('http://10.0.2.2:8080/rest-auth/signup/', {
      method: 'POST',
      body: JSON.stringify(this.state.signupData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.key) {
          AsyncStorage.setItem('auth-token', response.key);
          AsyncStorage.setItem('username', this.state.signupData.username);
          this.props.navigation.push('Home');
        } else if (response.username) {
          alert(response.username);
        } else if (response.email) {
          alert(response.email);
        } else if (response.password1) {
          alert(response.password1);
        } else if (response.password2) {
          alert(response.password2);
        } else if (response.non_field_errors) {
          alert(response.non_field_errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          생성할 아이디와 비밀번호를 입력해주세요.
        </Text>
        <View>
          <TextInput
            style={styles.inputArea}
            placeholder="닉네임을 입력하세요."
            onChangeText={(text) => {
              this.setState({
                signupData: {
                  ...this.state.signupData,
                  username: text,
                },
              });
            }}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="이메일을 입력하세요."
            onChangeText={(text) => {
              this.setState({
                signupData: {
                  ...this.state.signupData,
                  email: text,
                },
              });
            }}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                signupData: {
                  ...this.state.signupData,
                  password1: text,
                },
              });
            }}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                signupData: {
                  ...this.state.signupData,
                  password2: text,
                },
              });
            }}
          />
          <TouchableOpacity onPress={this.onSignup} style={styles.signupBtn}>
            <Text>회원가입</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  signupBtn: {
    backgroundColor: 'transparent',
    color: 'blue',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  inputArea: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Signup;
