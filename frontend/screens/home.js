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
import Icon from 'react-native-vector-icons/Ionicons';

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
  onCommunity = () => {
    this.props.navigation.push('Community');
  };
  onRank = () => {
    this.props.navigation.push('Rank');
  };
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Nav}>
          <Text style={styles.title}>하루세끼</Text>
          
          <TouchableOpacity onPress={this.onProfile}>
            <Image
              style={styles.profileImg}
              source={{
                uri:
                  'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body1}>
          <TouchableOpacity style={styles.photoBtn}>
            <Icon name="camera-outline" style={styles.photo}></Icon>
            <Text style={styles.photo_text}>사진 등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body2}>
          <View style={styles.body3}>
            <Icon name="calendar-outline" style={styles.record} />
            <Text style={styles.record}>내 기록</Text>
          </View>
          <View style={styles.body4}>
            <TouchableOpacity
              style={styles.communityBtn}
              onPress={this.onCommunity}>
              <View style={styles.btnContent}>
                <Icon name="earth-outline" style={styles.community} />
                <Text style={styles.community}>커뮤니티</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body5}>
          <View style={styles.body6}>
            <TouchableOpacity style={styles.rankBtn} onPress={this.onRank}>
              <View style={styles.btnContent}>
                <Icon name="medal-outline" style={styles.ranking} />
                <Text style={styles.ranking}>랭킹</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.body7}>
            <Icon name="trophy-outline" style={styles.game} />
            <TouchableOpacity>
              <Text style={styles.game}>식단월드컵</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.body7}>
            <TouchableOpacity>
              <View style={styles.btnContent}>
                <Icon name="trophy-outline" style={styles.game} />
                <Text style={styles.game}>식단월드컵</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#FFFBE6',
  },
  Nav: {
    backgroundColor: '#fca652',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: "BMJUA",
    color: 'white',
  },
  profileImg: {
    width: 35,
    height: 35,
  },
  body1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    borderWidth: 1,
    borderBottomColor: 'gray',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  photo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  photo_text: {
    fontFamily: "BMHANNA",
    fontSize: 30
  },
  body2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  body3: {
    width: '50%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  record: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  body4: {
    width: '50%',
    // flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'blue',
    padding: 0,
  },
  photoBtn:{
    // flexDirection: 'row',
    width: '100%',
    height: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityBtn: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
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
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'green',
  },
  rankBtn: {
    // flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ranking: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body7: {
    width: '50%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  game: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  btnContent: {
    alignItems: 'center',
  },
});
