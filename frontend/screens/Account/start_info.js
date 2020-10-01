import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  width,
  AsyncStorage,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

class Startinfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      weight: null,
      age: null,
      active: 'normal',
    };
  }
  infoNext = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    if (this.state.height && this.state.weight && this.state.age) {
      fetch('http://10.0.2.2:8080/accounts/need/info/', {
        method: 'PATCH',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('모든 정보가 입력되지 않아 저장되지 않았습니다.');
    }
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.next} onPress={this.infoNext}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>
            다음
          </Text>
        </TouchableOpacity>
        <Text style={{marginTop: 150}}>아이콘</Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'gray',
            marginBottom: 100,
            textAlign: 'center',
          }}>
          기초대사량 계산을 위해{'\n'}다음 정보를 입력해주세요.
        </Text>
        <View>
          <TextInput
            style={styles.inputArea}
            placeholder="키"
            onChangeText={(text) => {
              this.setState({height: text});
            }}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="몸무게"
            onChangeText={(text) => {
              this.setState({weight: text});
            }}
          />
          <TextInput
            style={styles.inputArea}
            placeholder="나이"
            onChangeText={(text) => {
              this.setState({age: text});
            }}
          />
        </View>
        <View style={styles.location}>
          <View style={styles.ncircle}></View>
          <View style={styles.ycircle}></View>
          <View style={styles.ncircle}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    flex: 1,
    alignItems: 'center',
  },
  next: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  inputArea: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 7,
    marginBottom: 7,
    width: 300,
    borderRadius: 5,
  },
  location: {
    position: 'absolute',
    top: 600,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
    height: 50,
  },
  ycircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  ncircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
});

export default Startinfo;
