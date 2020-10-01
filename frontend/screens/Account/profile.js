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

// const serverUrl = 'http:10.0.2.2:8080/'

const {width, height} = Dimensions.get('screen');

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      profileData: {
        username: '',
        age: '',
        sex: '',
        height: '',
        weight: '',
        bm: '',
      },
    };
  }
  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      username: await AsyncStorage.getItem('username'),
    });
    this.getInfo();
    console.log(this.state.userId);
  }
  getInfo = () => {
    fetch(`http://10.0.2.2:8080/accounts/profile/${this.state.username}`, {
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  goHome = () => {
    this.props.navigation.push('Home');
  };
  onUpdateImg = () => {
    // this.props.navigation.push('UpdateImg')
  };
  onUpdate = () => {
    // this.props.navigation.push('Update')
  };
  onDelete = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    fetch(`http://10.0.2.2:8080/accounts/delete/${this.state.username}`, {
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
    let age;
    let gender;
    let height;
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
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onUpdate} style={styles.updateBtn}>
          <Text style={styles.updateText}>수정</Text>
        </TouchableOpacity>
        <View>
          <Image
            style={styles.profileImg}
            source={{
              uri:
                'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
            }}
          />
          <View onPress={this.onUpdateImg} style={styles.updateImgBtn}>
            <Image
              style={styles.updateImg}
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/write-256.png',
              }}
            />
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.infoTitle}>
            <Text style={styles.infoText}>아이디</Text>
            <Text style={styles.infoText}>나이</Text>
            <Text style={styles.infoText}>성별</Text>
            <Text style={styles.infoText}>키</Text>
            <Text style={styles.infoText}>기초대사량</Text>
          </View>
          <View style={styles.infoCon}>
            <Text style={styles.infoText}>{this.state.username}</Text>
            <Text style={styles.infoText}>{age}</Text>
            <Text style={styles.infoText}>{gender}</Text>
            <Text style={styles.infoText}>{height}</Text>
            <Text style={styles.infoText}>{this.state.bm}kcal</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onDelete} style={styles.deleteBtn}>
          <Text style={styles.delText}>회원탈퇴</Text>
        </TouchableOpacity>
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
  profileImg: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  updateImgBtn: {
    width: 25,
    height: 25,
    backgroundColor: '#F1C40F',
    borderRadius: 50,
    position: 'absolute',
    right: 15,
    bottom: 30,
    zIndex: 2,
  },
  updateImg: {
    width: 15,
    height: 15,
    margin: 5,
  },
  userInfo: {
    borderWidth: 1,
    borderRadius: 5,
    width: (width / 5) * 3.5,
    flexDirection: 'row',
  },
  infoItem: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  infoTitle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  infoCon: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 20,
  },
  infoText: {
    fontSize: 18,
    margin: 10,
  },
  gohomeBtn: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  updateBtn: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 15,
    top: -40,
    zIndex: 2,
  },
  updateText: {
    fontSize: 20,
    color: 'orange',
  },
  deleteBtn: {
    marginTop: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  delText: {
    color: 'blue',
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
  },
});

export default Profile;
