import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  width,
  AsyncStorage,
  Image,
} from 'react-native';

class Startsex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      need: {sex: ''},
      malecolor: 'transparent',
      femalecolor: 'transparent',
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
      malecolor: '#51adcf',
      femalecolor: 'transparent',
    });
  };
  setFemale = () => {
    this.setState({
      need: {sex: 'female'},
      malecolor: 'transparent',
      femalecolor: '#f9c0c0',
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.next} onPress={this.infoNext}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fca652'}}>
            다음
          </Text>
        </TouchableOpacity>
        <Image
            source={
              require('../assets/images/sex.png')
            }
            style={styles.image}/>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'gray',
            marginVertical: 20,
          }}>
          성별을 입력해주세요.
        </Text>
        <View style={styles.selectboxes}>
          <TouchableOpacity
            style={[styles.selectbox1, {backgroundColor: this.state.malecolor}]}
            onPress={this.setMale}>
            <Image source={
              require('../assets/images/male.png')
            }
            style={styles.selectsex}/>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>남</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectbox2, {backgroundColor: this.state.femalecolor}]}
            onPress={this.setFemale}>
            <Image source={
              require('../assets/images/female.png')
            }
            style={styles.selectsex}/>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>여</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBE6',
  },
  image: {
    width: 188,
    height: 150,
  },
  selectboxes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectbox1: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent' 
  },
  selectbox2: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent' 
  },
  selectsex: {
    width: 100,
    height: 100
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
    backgroundColor: '#fca652',
  },
  ncircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
});

export default Startsex;
