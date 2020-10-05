import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const serverUrl = 'http://10.0.2.2:8080/';

export default class MyFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: this.props.route.params.article,
    };
  }
  render() {
    return (
      <View sytle={styles.container}>
        <Text>{this.state.article.id}</Text>
        {/* <Text>1</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
