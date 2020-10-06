import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
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
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginLeft: '5%',
                    marginBottom: 10,
                    color: 'gray'
                  }}>
                  Top 3
                </Text>
                <View style={styles.rankBox}></View>
              </View>
              <View style={styles.articles}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginLeft: '5%',
                    marginBottom: 10,
                  }}></Text>
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
              <Text>팔로워</Text>
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
    fontFamily: 'BMJUA',
  },
  rankArea: {
    width: '100%',
    marginBottom: 20,
  },
  rankBox: {
    alignSelf: 'center',
    height: 200,
    width:"90%",
    backgroundColor:"transparent",
    borderRadius:10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10, 
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
});

export default Rank;
