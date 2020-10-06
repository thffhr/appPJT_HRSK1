import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AsyncStorage, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const serverUrl = 'http://10.0.2.2:8080/';

const {width, height} = Dimensions.get('screen');
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      age: '',
      sex: '',
      height: '',
      weight: '',
      bm: '',
      active: '',
    };
  }

  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      username: await AsyncStorage.getItem('username'),
    });
    this.getInfo();
  }
  getInfo = () => {
    fetch(`${serverUrl}accounts/profile/${this.state.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          age: response.age,
          sex: response.sex,
          height: response.height,
          weight: response.weight,
          bm: response.basal_metabolism,
          profileImage: response.profileImage,
          active: response.active,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  goHome = () => {
    this.props.navigation.push('Home');
  };
  // onUpdateImg = () => {
  //   this.props.navigation.push('UpdateImg');
  // };
  onUpdate = async () => {
    const username = await AsyncStorage.getItem('username')
    this.props.navigation.push('Update', {
      sex: this.state.sex,
      bm: this.state.bm,
      profileImage: this.state.profileImage,
      username: username,
      active: this.state.active
    })
  };
  onDelete = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    fetch(`${serverUrl}accounts/delete/${this.state.username}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        AsyncStorage.clear();
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const ageCheck = this.state.age;
    const genderCheck = this.state.sex;
    const heightCheck = this.state.height;
    const weightCheck = this.state.weight;
    let age;
    let gender;
    let height;
    let weight;

    if (ageCheck) {
      age = `${ageCheck}세`;
    } else {
      age = '정보 없음';
    }
    if (genderCheck == 'male') {
      gender = '남성';
    } else if (genderCheck == 'female') {
      gender = '여성';
    } else {
      gender = '정보 없음';
    }
    if (heightCheck) {
      height = `${heightCheck}cm`;
    } else {
      height = '정보 없음';
    }
    if (weightCheck) {
      weight = `${weightCheck}kg`;
    } else {
      weight = '정보 없음';
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onUpdate} style={styles.updateBtn}>
          <Text style={styles.updateText}>수정</Text>
        </TouchableOpacity>
        <View>
          {this.state.profileImage && (
            <Image
              style={styles.profileImg}
              source={{
                uri: `${serverUrl}gallery` + this.state.profileImage,
              }}
            />
          )}
          {!this.state.profileImage && (
            <Image
              style={styles.profileImg}
              source={{
                uri:
                  'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
              }}
            />
          )}
          {/* <TouchableOpacity
            onPress={this.onUpdateImg}
            style={styles.updateImgBtn}>
            <Image
              style={styles.updateImg}
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/write-256.png',
              }}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.userInfo}>
          <View style={styles.infoTitle}>
            <Text style={styles.infotitle}>아이디</Text>
            <Text style={styles.infotitle}>나이</Text>
            <Text style={styles.infotitle}>성별</Text>
            <Text style={styles.infotitle}>키</Text>
            <Text style={styles.infotitle}>몸무게</Text>
            <Text style={styles.infotitle}>기초대사량</Text>
          </View>
          <View style={styles.infoCon}>
            <Text style={styles.infoText}>{this.state.username}</Text>
            <Text style={styles.infoText}>{age}</Text>
            <Text style={styles.infoText}>{gender}</Text>
            <Text style={styles.infoText}>{height}</Text>
            <Text style={styles.infoText}>{weight}</Text>
            <Text style={styles.infoText}>{this.state.bm}kcal</Text>
          </View>
        </View>
        <TouchableOpacity
            style={styles.logoutBtn}
            onPress={async () => {
              const token = await AsyncStorage.getItem('auth-token');
              console.log(token);
              if (token !== null) {
                fetch('http://10.0.2.2:8080/rest-auth/logout/', {
                  method: 'POST',
                  header: {
                    Authorization: `Token ${token}`,
                  },
                })
                  .then(() => {
                    console.log('로그아웃 성공');
                    AsyncStorage.clear();
                    this.props.navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: 'Login'}],
                      }),
                    );
                  })
                  .catch((err) => console.error(err));
              }
            }}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
         {/*  
        <TouchableOpacity onPress={this.onDelete} style={styles.deleteBtn}>
          <Text style={styles.delText}>회원탈퇴</Text>
        </TouchableOpacity>
         */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFBE6',
    alignItems: 'center',
  },
  profileImg: {
    marginTop: W*0.1,
    width: W*0.3,
    height: W*0.3,
    marginBottom: W*0.15,
  },
  updateImgBtn: {
    width: W*0.075,
    height: W*0.075,
    backgroundColor: '#F1C40F',
    borderRadius: W*0.075,
    position: 'absolute',
    right: W*0.05,
    bottom: W*0.125,
    zIndex: 2,
  },
  updateImg: {
    width: W*0.05,
    height: W*0.05,
    margin: W*0.015,
  },
  userInfo: {
    borderRadius: 5,
    width: '70%',
    flexDirection: 'row',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  infoItem: {
    marginTop: H*0.02,
    marginBottom: H*0.02,
    marginLeft: W*0.03,
    marginRight: W*0.03,
  },
  infoTitle: {
    marginTop: H*0.02,
    marginBottom: H*0.02,
    marginLeft: W*0.03,
    marginRight: W*0.03,
  },
  infoCon: {
    marginTop: H*0.02,
    marginBottom: H*0.02,
    marginLeft: W*0.03,
    marginRight: W*0.03,
  },
  infotitle: {
    fontFamily: 'BMDOHYEON',
    fontSize: W*0.05,
    margin: H*0.019,
  },
  infoText: {
    fontFamily: 'BMHANNAAir',
    fontSize: W*0.05,
    margin: H*0.02,
  },
  gohomeBtn: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  updateBtn: {
    position: 'absolute',
    right: W * 0.03,
    top: W * 0.03,
  },
  updateText: {
    fontSize:  W * 0.05,
    color: '#fca652',
    fontWeight: 'bold'
  },
  logoutBtn: {
    
  },
  logoutText: {
    color: '#fca652',
    fontFamily: 'BMHANNAAir',
    fontSize: W*0.06
  },
  // deleteBtn: {
  //   marginTop: 50,
  //   backgroundColor: 'transparent',
  //   position: 'absolute',
  //   bottom: 20,
  //   alignItems: 'center',
  // },
  // delText: {
  //   color: 'blue',
  //   borderBottomColor: 'blue',
  //   borderBottomWidth: 1,
  // },
});

export default Profile;
