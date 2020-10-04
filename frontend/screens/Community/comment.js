import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {AsyncStorage, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// const serverUrl = 'http:10.0.2.2:8080/'

const {width, height} = Dimensions.get('screen');

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: this.props.route.params.articleId,
      comments: [],
      myComment: {
        content: '',
      },
    };
  }

  createComment = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    if (this.state.myComment.content) {
      fetch(
        `http://10.0.2.2:8080/articles/` +
          this.state.articleId +
          '/create_comment/',
        {
          method: 'POST',
          body: JSON.stringify(this.state.myComment),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.getComments();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      username: await AsyncStorage.getItem('username'),
    });
    this.getComments();
  }

  getComments = () => {
    fetch(
      `http://10.0.2.2:8080/articles/` + this.state.articleId + '/comments/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          comments: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{width: '100%'}}>
            <View style={styles.comments}>
              {this.state.comments.map((comment) => {
                return (
                  <View style={styles.comment} key={comment.id}>
                    <Image
                      style={styles.commenterImg}
                      source={{
                        uri:
                          'http://10.0.2.2:8080/gallery' +
                          comment.user.profileImage,
                      }}
                    />
                    <View style={styles.commentText}>
                      <Text>
                        {comment.user.username}
                        {'    '}
                        {comment.content}
                      </Text>
                      <Text>{comment.created_at}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <TextInput
          style={styles.inputArea}
          placeholder="댓글을 입력하세요."
          onChangeText={(text) => {
            this.setState({
              myComment: {content: text},
            });
          }}
        />
        <Button title="작성" onPress={this.createComment}></Button>
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
  comments: {
    width: '100%',
  },
  comment: {
    width: '100%',
    flexDirection: 'row',
  },
  commenterImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  commentText: {},
});

export default Comment;
