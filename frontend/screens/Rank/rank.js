import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions
} from 'react-native';


const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;
import {CommonActions} from '@react-navigation/native';

class Rank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [
        {
          title: '제목1',
          user: '작성자1',
          content: '내용1',
          id: 1,
          tags: ['태그1', '태그2', '태그3'],
        },
        {
          title: '제목2',
          user: '작성자2',
          content: '내용2',
          id: 2,
          tags: ['태그1', '태그2', '태그3'],
        },
      ],
      users: [
        {
          id: 1,
          username: '김태희',
          follower: 567
        },
        {
          id: 2,
          username: '트와이스',
          follower: 456
        },
        {
          id: 3,
          username: '레드벨벳',
          follower: 345
        },
        {
          id: 4,
          username: '방탄소년단',
          follower: 234
        },
        {
          id: 5,
          username: 'exo',
          follower: 123
        },
      ],
      btn1_color: '#fca652',
      btn2_color: 'transparent',
      active: 'btn1',
    };
  }
  onBtn1 = () => {
    this.setState({
      btn1_color: '#fca652',
      btn2_color: 'transparent',
      active: 'btn1',
    });
  };
  onBtn2 = () => {
    this.setState({
      btn1_color: 'transparent',
      btn2_color: '#fca652',
      active: 'btn2',
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <View style={styles.btnList}>
          <TouchableOpacity
            onPress={this.onBtn1}
            style={[styles.btn1, {borderBottomColor: this.state.btn1_color}]}>
            <Text style={styles.btnText}>식단</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onBtn2}
            style={[styles.btn2, {borderBottomColor: this.state.btn2_color}]}>
            <Text style={styles.btnText}>팔로워</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          {this.state.active == 'btn1' && (
            <View style={{width: '100%'}}>
              <View style={styles.rankArea}>
                <Text
                  style={styles.title}>
                  Top 3
                </Text>
                <View style={styles.rankBox}></View>
              </View>
              <View style={styles.articles}>
                  <Text
                      style={styles.title}>
                      인기식단
                    </Text>
                {this.state.articles.map((article) => {
                  return (
                    <View style={styles.article} key={article.id}>
                      <View style={styles.writer}>
                        <View
                          style={{
                            borderRadius: 50,
                            width: 50,
                            height: 50,
                            backgroundColor: 'green',
                          }}></View>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {article.user}
                        </Text>
                      </View>
                      <View style={styles.tags}>
                        {article.tags.map((tag) => {
                          return (
                            <View style={styles.tag}>
                              <Text
                                key={tag}
                                style={{fontSize: 15, color: 'white'}}
                                >
                                #{tag}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View
                        style={{
                          width: '100%',
                          height: 400,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'orange',
                          marginBottom: 10,
                        }}>
                        <Text>이미지자리</Text>
                      </View>
                      <View style={styles.articleBelow}>
                        <View style={styles.articleBtns}>
                          <View
                            style={{
                              borderRadius: 40,
                              width: 40,
                              height: 40,
                              backgroundColor: 'green',
                              marginRight: 10,
                            }}></View>
                          <View
                            style={{
                              borderRadius: 40,
                              width: 40,
                              height: 40,
                              backgroundColor: 'green',
                              marginRight: 10,
                            }}></View>
                          <View
                            style={{
                              borderRadius: 40,
                              width: 40,
                              height: 40,
                              backgroundColor: 'green',
                              marginRight: 10,
                            }}></View>
                        </View>
                        <Text
                          style={{
                            marginBottom: 10,
                            fontSize: 20,
                          }}>
                          (하트) abcdefg님 외 1명이 좋아합니다.
                        </Text>
                        <Text>{article.content}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          {this.state.active == 'btn2' && (
            <View>
              {this.state.users.map((user) => {
                return (
                  <View style={styles.follow} key={user.follower}>
                    <Text style={styles.ranking}>
                      {user.id}
                    </Text>
                    <View
                          style={{
                            borderRadius: W*0.15,
                            width: W*0.15,
                            height: W*0.15,
                            marginRight: '5%',
                            backgroundColor: 'green',
                          }}></View>
                    <Text style={styles.followUser}>
                      {user.username}
                    </Text>
                    <Text style={styles.followCnt}>
                      {user.follower}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fca652',
  },
  haru: {
    fontSize: 30,
    fontFamily: 'BMJUA',
    color: '#fff',
  },
  btnList: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  btn1: {
    flexDirection: 'row',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
  },
  btn2: {
    flexDirection: 'row',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
  },
  btnText: {
    fontSize: 20,
    color: '#696969',
    fontFamily: 'BMJUA',
  },
  rankArea: {
    width: '100%',
    marginBottom: 50,
  },
  rankBox: {
    alignSelf: 'center',
    height: 200,
    width:"90%",
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor:"transparent",
    borderRadius:10,
  },
  title: {
    fontSize: 25,
    marginLeft: '5%',
    marginBottom: 10,
    color: '#696969',
    fontFamily: 'BMDOHYEON'
  },
  articles: {
    width: '100%',
    flexDirection: 'column',
  },
  article: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 50,
  },
  writer: {
    marginLeft: '5%',
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleBelow: {
    marginLeft: '5%',
  },
  tags: {
    marginBottom: 10,
    marginLeft: '5%',
    width: '100%',
    flexDirection: 'row',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#FFFBE6',
    backgroundColor: '#fca652',
    padding: 7.5,
    marginRight: 10
  },
  articleBtns: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  follow: {
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: '10%'
  },
  ranking: {
    marginRight: '5%',
    fontSize: W*0.07,
    fontFamily: 'BMHANNA',
    width: W*0.05
  },
  followUser: {
    marginRight: '5%',
    fontSize: W*0.07,
    fontFamily: 'BMHANNA',
    width: W*0.35
  },
  followCnt: {
    marginRight: '5%',
    fontSize: W*0.07,
    fontFamily: 'BMHANNA',
    width: W*0.25
  }
});

export default Rank;
