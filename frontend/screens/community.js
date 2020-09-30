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
import Icon from 'react-native-vector-icons/Ionicons';

class Community extends Component {
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
      btn1_color: 'orange',
      btn2_color: 'white',
      active: 'btn1',
    };
  }
  onCreateSelect = () => {
    this.props.navigation.push('CreateSelect');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <ScrollView>
          <View style={{width: '100%'}}>
            {this.state.active == 'btn1' && (
              <View style={{width: '100%'}}>
                <View style={styles.articles}>
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
                              <Text
                                key={tag}
                                style={{marginRight: 5, fontSize: 20}}>
                                #{tag}
                              </Text>
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
                            <Icon
                              name="heart"
                              style={{fontSize: 20, color: 'red'}}
                            />{' '}
                            abcdefg님 외 1명이 좋아합니다.
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
        <TouchableOpacity
          style={styles.createArticle}
          onPress={this.onCreateSelect}>
          <Icon name="add-outline" style={{color: 'black', fontSize: 30}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  navbar: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  haru: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  articles: {
    width: '100%',
    flexDirection: 'column',
  },
  article: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 20,
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
  articleBtns: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  createArticle: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

export default Community;
