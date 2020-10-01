import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  width,
  AsyncStorage,
} from 'react-native';

class Startsex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      need: {sex: ''},
      malecolor: 'white',
      femalecolor: 'white',
    };
  }
  infoNext = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    if (this.state.need.sex) {
      fetch('http://10.0.2.2:8080/accounts/need/', {
        method: 'PATCH',
        body: JSON.stringify(this.state.need),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          this.props.navigation.push('Startinfo');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('성별을 선택해주세요');
    }
  };
  setMale = () => {
    this.setState({
      need: {sex: 'male'},
      malecolor: '#a2d5f2',
      femalecolor: 'white',
    });
  };
  setFemale = () => {
    this.setState({
      need: {sex: 'female'},
      malecolor: 'white',
      femalecolor: '#ff9595',
    });
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
          }}>
          성별을 입력해주세요.
        </Text>
        <View style={styles.selectboxes}>
          <TouchableOpacity
            style={[styles.selectbox1, {backgroundColor: this.state.malecolor}]}
            onPress={this.setMale}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>남</Text>
          </TouchableOpacity>
          <View
            style={{width: 2, height: 200, backgroundColor: 'black'}}></View>
          <TouchableOpacity
            style={[
              styles.selectbox2,
              {backgroundColor: this.state.femalecolor},
            ]}
            onPress={this.setFemale}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>여</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.location}>
          <View style={styles.ycircle}></View>
          <View style={styles.ncircle}></View>
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
  selectboxes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectbox1: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectbox2: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    position: 'absolute',
    right: 15,
    top: 15,
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

export default Startsex;
