import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }
  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      username: await AsyncStorage.getItem('username'),
    });
  }
  onProfile = () => {
    this.props.navigation.push('Profile');
  };
  onCamera = () => {
    this.props.navigation.push('Camera');
  };
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Nav}>
          <Text style={styles.title}>하루세끼</Text>
          <TouchableOpacity
            style={styles.user}
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
            <Text style={styles.user}>로그아웃</Text>
          </TouchableOpacity>
          <Text style={styles.user} onPress={this.onProfile}>
            {/* {this.state.username} */}
            <Image
              style={styles.profileImg}
              source={{
                uri:
                  'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
              }}
            />
          </Text>
        </View>
        <View style={styles.body1}>
          <TouchableOpacity onPress={this.onCamera}>
            <Text style={styles.photo}>사진 등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body2}>
          <View style={styles.body3}>
            <Text style={styles.record}>내 기록</Text>
          </View>
          <View style={styles.body4}>
            <Text style={styles.community}>커뮤니티</Text>
          </View>
        </View>
        <View style={styles.body5}>
          <View style={styles.body6}>
            <Text style={styles.ranking}>랭킹</Text>
          </View>
          <View style={styles.body7}>
            <Text style={styles.game}>식단월드컵</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    width: width,
    flex: 1,
  },
  Nav: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  user: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImg: {
    width: 25,
    height: 25,
  },
  body1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  photo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  body3: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  record: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body4: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  community: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  body6: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  ranking: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body7: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  game: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
