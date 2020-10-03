import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const H = Dimensions.get('window').height
const W = Dimensions.get('window').width

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
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Startsex'}],
            }),
          );
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
        <Image
            source={
              require('../assets/images/로고.png')
            }
            style={styles.image}/>
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
            <Text style={styles.signBtnText}>회원가입</Text>
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
  description: {
    fontSize: W*0.03,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 40,
    textAlign: 'center',
  },
  signupBtn: {
    alignItems: 'center',
    backgroundColor: '#fca652',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
  },
  signBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputArea: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    borderBottomColor: 'gray',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30
  },
});

export default Signup;
