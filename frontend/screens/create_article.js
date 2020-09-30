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

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.route.params.selected,
      tags: '태그1 태그2',
      content: '',
    };
  }
  infoNext = async () => {
    const token = await AsyncStorage.getItem('auth-token');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.next} onPress={this.infoNext}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>
            공유
          </Text>
        </TouchableOpacity>
        <View style={styles.navbar}>
          <Text style={styles.title}>새 게시물</Text>
        </View>
        <View style={styles.block1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                backgroundColor: 'green',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginRight: 10,
              }}>
              프사
            </Text>
            <TextInput
              placeholder="해시태그를 입력하세요"
              value={this.state.tags}
              onChangeText={(text) => {
                this.setState({
                  tags: text,
                });
              }}
              // style={{borderWidth: 1}}
            />
          </View>
          <Text
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              backgroundColor: 'green',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {this.state.selected}
          </Text>
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
                content: text,
              });
            }}
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
  next: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  block1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    padding: 10,
  },
});

export default CreateArticle;
