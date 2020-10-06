import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const serverUrl = 'http://10.0.2.2:8080/';

export default class UserFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userArticles: [],
      username: this.props.route.params.username,
      userData: {},
      selected: {id: null, image: null},
    };
  }
  componentDidMount() {
    this.getUserArticles();
  }
  getUserArticles = () => {
    fetch(`${serverUrl}articles/read/${this.state.username}/`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userArticles: response,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    fetch(`${serverUrl}accounts/profile/${this.state.username}/`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          userData: response,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <ScrollView>
          <View style={styles.profileBox}>
            <View style={styles.imgBox}>
              {this.state.userData.profileImage && (
                <Image
                  style={styles.profileImg}
                  source={{
                    uri:
                      `${serverUrl}gallery` + this.state.userData.profileImage,
                  }}
                />
              )}
              {!this.state.userData.profileImage && (
                <Image
                  style={styles.profileImg}
                  source={{
                    uri:
                      'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                }}>
                {this.state.userData.username}
              </Text>
            </View>
            <View style={styles.cntBox}>
              <Text style={styles.cntContent}>게시글</Text>
              <Text style={styles.cntContent}>
                {this.state.userArticles.length}
              </Text>
            </View>
            <View style={styles.cntBox}>
              <Text style={styles.cntContent}>팔로워</Text>
              <Text style={styles.cntContent}>0</Text>
            </View>
            <View style={styles.cntBox}>
              <Text style={styles.cntContent}>팔로잉</Text>
              <Text style={styles.cntContent}>0</Text>
            </View>
          </View>
          <View style={styles.pictureBox}>
            {this.state.userArticles.map((article) => {
              const borderColor =
                article.id === this.state.selected.id
                  ? '#FCA652'
                  : 'transparent';
              return (
                <TouchableOpacity
                  style={[styles.imgBtn, {borderColor: borderColor}]}
                  key={article.id}
                  onPress={() => {
                    this.setState({
                      selected: {id: article.id, image: article.image},
                    });
                    this.props.navigation.push('MyFeed', {
                      article: article,
                    });
                  }}>
                  <Image
                    style={styles.picture}
                    source={{
                      uri: `${serverUrl}gallery` + article.image,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBE6',
    width: '100%',
    flex: 1,
  },
  navbar: {
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: 'gray',
    // borderBottomWidth: 2,
    backgroundColor: '#fca652',
    elevation: 5,
    flexDirection: 'row',
  },
  haru: {
    fontSize: 30,
    // fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'BMJUA',
    marginLeft: 15,
  },

  // profileBox
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  imgBox: {},
  profileImg: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  cntBox: {},
  cntContent: {
    textAlign: 'center',
    fontSize: 20,
  },

  // my articles
  pictureBox: {
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#232323',
    marginVertical: 20,
    paddingVertical: 20,
  },
  imgBtn: {
    width: '25%',
    height: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
});
