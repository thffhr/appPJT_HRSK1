import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Image,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }
  onCreateSelect = () => {
    this.props.navigation.push('CreateSelect');
  };

  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    fetch(`http://10.0.2.2:8080/articles/readAll/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          articles: response,
        });
        console.log(this.state.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        {!this.state.articles[0] && (
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            아직 게시물이 없습니다. ㅠㅠ
          </Text>
        )}
        <ScrollView>
          <View style={{width: '100%'}}>
            <View style={{width: '100%'}}>
              <View style={styles.articles}>
                {this.state.articles.map((article, i) => {
                  return (
                    <View style={styles.article} key={article.id}>
                      <View style={styles.writer}>
                        <Image
                          style={styles.writerImg}
                          source={{
                            uri:
                              'http://10.0.2.2:8080/gallery' +
                              article.user.profileImage,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {article.user.username}
                        </Text>
                      </View>
                      {/* <View style={styles.tags}>
                          {article.tags.map((tag) => {
                            return (
                              <Text
                                key={tag}
                                style={{marginRight: 5, fontSize: 20}}>
                                #{tag}
                              </Text>
                            );
                          })}
                        </View> */}
                      <Image
                        style={styles.articleImg}
                        source={{
                          uri: 'http://10.0.2.2:8080/gallery' + article.image,
                        }}
                      />
                      <View style={styles.articleBelow}>
                        <View style={styles.articleBtns}>
                          <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={async () => {
                              const token = await AsyncStorage.getItem(
                                'auth-token',
                              );
                              fetch(
                                `http://10.0.2.2:8080/articles/articleLikeBtn/`,
                                {
                                  method: 'POST',
                                  body: JSON.stringify({articleId: article.id}),
                                  headers: {
                                    Authorization: `Token ${token}`,
                                    'Content-Type': 'application/json',
                                  },
                                },
                              )
                                .then((response) => response.json())
                                .then((response) => {
                                  console.log(response);
                                  const isliked = article.isliked;
                                  this.setState({
                                    articles: this.state.articles.map((art) =>
                                      article.id === art.id
                                        ? {...art, isliked: !isliked}
                                        : art,
                                    ),
                                  });
                                  console.log(this.state.articles);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}>
                            {article.isliked && (
                              <Icon
                                name="heart"
                                style={{fontSize: 40, color: 'red'}}
                              />
                            )}
                            {!article.isliked && (
                              <Icon
                                name="heart-outline"
                                style={{fontSize: 40}}
                              />
                            )}
                          </TouchableOpacity>
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
  writerImg: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  articleImg: {
    width: '100%',
    height: 400,
    marginBottom: 10,
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
