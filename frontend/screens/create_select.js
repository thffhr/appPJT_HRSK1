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

class CreateSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '1',
      pictures: [
        {pid: 1, image: '1'},
        {pid: 2, image: '2'},
        {pid: 3, image: '3'},
        {pid: 4, image: '4'},
        {pid: 5, image: '5'},
        {pid: 6, image: '6'},
        {pid: 7, image: '7'},
        {pid: 8, image: '8'},
        {pid: 9, image: '9'},
        {pid: 10, image: '10'},
      ],
    };
  }
  onNext = () => {
    this.props.navigation.push('CreateArticle', {
      selected: this.state.selected,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.next} onPress={this.onNext}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>
            다음
          </Text>
        </TouchableOpacity>
        <View style={styles.navbar}>
          <Text style={styles.title}>사진선택</Text>
        </View>
        <View style={styles.selected}>
          <Text style={{color: 'white', fontSize: 50}}>
            {this.state.selected}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={{color: '#08ceff'}}>사진에서 선택</Text>
        </View>
        <ScrollView>
          <View style={styles.pictures}>
            {this.state.pictures.map((picture) => {
              return (
                <TouchableOpacity
                  style={styles.picture}
                  key={picture.pid}
                  onPress={() => {
                    this.setState({
                      selected: picture.image,
                    });
                  }}>
                  <Text style={{color: 'white', fontSize: 30}}>
                    {picture.image}
                  </Text>
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
    zIndex: 1,
  },
  selected: {
    width: '100%',
    height: 400,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  pictures: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picture: {
    width: '25%',
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateSelect;
