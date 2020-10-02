import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Switch,
  Image,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: '태그1 태그2',
      content: '',
      RswitchValue: false,
      CswitchValue: true,
      SswitchValue: true,
      articleInfo: {
        content: '',
        recipe: '',
        image: this.props.route.params.selected.image,
        canComment: true,
        canSearch: true,
      },
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
          profileImage: response.profileImage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createArticle = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    fetch(`http://10.0.2.2:8080/articles/create/`, {
      method: 'POST',
      body: JSON.stringify(this.state.articleInfo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
        this.props.navigation.push('Community');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  RtoggleSwitch = () => {
    if (this.state.RswitchValue) {
      this.setState({
        RswitchValue: false,
      });
    } else {
      this.setState({
        RswitchValue: true,
      });
    }
  };
  CtoggleSwitch = () => {
    if (this.state.CswitchValue) {
      this.setState({
        CswitchValue: false,
        articleInfo: {
          content: this.state.articleInfo.content,
          recipe: this.state.articleInfo.recipe,
          image: this.state.articleInfo.image,
          canComment: false,
          canSearch: this.state.articleInfo.canSearch,
        },
      });
    } else {
      this.setState({
        CswitchValue: true,
        articleInfo: {
          content: this.state.articleInfo.content,
          recipe: this.state.articleInfo.recipe,
          image: this.state.articleInfo.image,
          canComment: true,
          canSearch: this.state.articleInfo.canSearch,
        },
      });
    }
  };
  StoggleSwitch = () => {
    if (this.state.SswitchValue) {
      this.setState({
        SswitchValue: false,
        articleInfo: {
          content: this.state.articleInfo.content,
          recipe: this.state.articleInfo.recipe,
          image: this.state.articleInfo.image,
          canComment: this.state.articleInfo.canComment,
          canSearch: false,
        },
      });
    } else {
      this.setState({
        SswitchValue: true,
        articleInfo: {
          content: this.state.articleInfo.content,
          recipe: this.state.articleInfo.recipe,
          image: this.state.articleInfo.image,
          canComment: this.state.articleInfo.canComment,
          canSearch: true,
        },
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.next} onPress={this.createArticle}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>
            공유
          </Text>
        </TouchableOpacity>
        <View style={styles.navbar}>
          <Text style={styles.title}>새 게시물</Text>
        </View>
        <View style={styles.block}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {this.state.profileImage && (
              <Image
                style={styles.profileImg}
                source={{
                  uri: 'http://10.0.2.2:8080/gallery' + this.state.profileImage,
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
            <TextInput
              placeholder="해시태그를 입력하세요"
              value={this.state.tags}
              onChangeText={(text) => {
                this.setState({
                  tags: text,
                });
              }}
              style={[styles.fs1, {flexShrink: 1, maxWidth: '70%'}]}
              multiline={true}
            />
          </View>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri:
                'http://10.0.2.2:8080/gallery' + this.state.articleInfo.image,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
            padding: 10,
          }}>
          <TextInput
            placeholder="내용을 입력하세요"
            onChangeText={(text) => {
              this.setState({
                articleInfo: {
                  content: text,
                  recipe: this.state.articleInfo.recipe,
                  image: this.state.articleInfo.image,
                  canComment: this.state.articleInfo.canComment,
                  canSearch: this.state.articleInfo.canSearch,
                },
              });
            }}
            style={{flexShrink: 1}}
            multiline={true}
          />
        </View>
        <View style={styles.block}>
          <View>
            <Text style={styles.fs1}>레시피 추가</Text>
            <Text style={{fontSize: 12, color: 'gray', marginTop: 10}}>
              게시물 하단에 레시피 추가 버튼이 생성됩니다.
            </Text>
          </View>
          <Switch
            onValueChange={this.RtoggleSwitch}
            value={this.state.RswitchValue}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.fs1}>댓글 허용</Text>
          <Switch
            onValueChange={this.CtoggleSwitch}
            value={this.state.CswitchValue}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.fs1}>검색 허용</Text>
          <Switch
            onValueChange={this.StoggleSwitch}
            value={this.state.SswitchValue}
          />
        </View>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  next: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  block: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fs1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateArticle;
