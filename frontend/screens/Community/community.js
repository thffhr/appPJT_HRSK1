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

const serverUrl = 'http://10.0.2.2:8080/';

export default class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      myArticles: [],
      selectedMenuBtn: false,
      selectedHome: true,
      selected: {id: null, image: null},
    };
  }
  componentDidMount() {
    this.getAllArticles();
    this.getMyAticles();
  }
  onCreateSelect = () => {
    this.props.navigation.push('CreateSelect');
  };
  onMenuBtn = () => {
    this.setState({
      selectedMenuBtn: !this.state.selectedMenuBtn,
    });
  };
  getAllArticles = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    fetch(`${serverUrl}articles/readAll/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('All Articles: ', response);
        this.setState({
          articles: response,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getMyAticles = async () => {
    // const token = await AsyncStorage.getItem('auth-token');
    // fetch(`${serverUrl}articles/readAll/`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Token ${token}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log('My Articles: ', response);
    //     this.setState({
    //       myArticles: response,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };
  swtichBtn = (flag) => {
    this.setState({
      selectedHome: flag,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
          <Icon
            name="menu"
            style={styles.menuBtn}
            onPress={this.onMenuBtn}></Icon>
        </View>
        {this.state.selectedMenuBtn && (
          <View style={styles.menuList}>
            <View style={styles.menuItem}>
              <Icon
                name="home"
                style={styles.menutTxt}
                onPress={() => this.swtichBtn(true)}></Icon>
            </View>
            <View style={styles.menuItem}>
              <Icon
                name="images"
                style={styles.menutTxt}
                onPress={() => this.swtichBtn(false)}></Icon>
            </View>
          </View>
        )}
        {!this.state.articles[0] && (
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            아직 게시물이 없습니다. ㅠㅠ
          </Text>
        )}
        <ScrollView>
          <View style={{width: '100%'}}>
            {this.state.selectedHome && ( // all articles
              <View style={styles.articles}>
                {this.state.articles.map((article) => {
                  return (
                    <View style={styles.article} key={article.id}>
                      <View style={styles.writer}>
                        <Image
                          style={styles.writerImg}
                          source={{
                            uri:
                              `${serverUrl}gallery` + article.user.profileImage,
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
                          uri: `${serverUrl}gallery` + article.image,
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
                              fetch(`${serverUrl}articles/articleLikeBtn/`, {
                                method: 'POST',
                                body: JSON.stringify({articleId: article.id}),
                                headers: {
                                  Authorization: `Token ${token}`,
                                  'Content-Type': 'application/json',
                                },
                              })
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
                          <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() => {
                              this.props.navigation.push('Comment', {
                                articleId: article.id,
                              });
                            }}>
                            <Icon
                              name="chatbubble-ellipses-outline"
                              style={{fontSize: 40}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() => {
                              alert('레시피가 없습니다');
                            }}>
                            <Icon
                              name="list-circle-outline"
                              style={{fontSize: 40}}
                            />
                          </TouchableOpacity>
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
            )}
            {!this.state.selectedHome && ( // My articles
              <View style={styles.pictureBox}>
                {this.state.myArticles.map((article) => {
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
                        // this.props.navigation.push('DetailImage', {
                        //   imageId: article.id,
                        //   image: article.image,
                        // });
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
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.createArticle}
          onPress={this.onCreateSelect}>
          <Icon name="create" style={{color: '#FFFBE6', fontSize: 30}} />
        </TouchableOpacity>
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
  menuBtn: {
    fontSize: 30,
    color: '#fff',
    marginRight: 15,
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
    width: 65,
    height: 65,
    borderRadius: 100,
    elevation: 5,
    // borderWidth: 3,
    // borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fca652',
  },
  menuList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuItem: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  menutTxt: {
    color: '#000000',
    fontSize: 20,
  },
  // my articles
  pictureBox: {
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
