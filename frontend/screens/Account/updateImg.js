import React from 'react';
import {StackActions} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';

const serverUrl = 'http://10.0.2.2:8080/';

export default class UpdateImg extends React.Component {
  state = {
    username: null,
    photo: null,
    avatarSource: null,
    profileImage: null,
  };

  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      username: await AsyncStorage.getItem('username'),
    });
    this.getInfo();
    console.log(this.state.userId);
  }

  getInfo = () => {
    fetch(`${serverUrl}accounts/profile/${this.state.username}`, {
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

  onNext = async () => {
    const token = await AsyncStorage.getItem('auth-token');
    if (this.state.photo) {
      const source = {uri: this.state.photo.uri};
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({
        avatarSource: source,
      });
      var data = new FormData();
      data.append('data', this.state.photo.data);
      data.append('type', this.state.photo.type);
      data.append('fileName', this.state.photo.fileName);

      fetch(`${serverUrl}accounts/pimg/update/`, {
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
          this.props.navigation.push('Profile');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!this.state.profileImage) {
      fetch(`${serverUrl}accounts/pimg/delete/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(() => {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          );
          this.props.navigation.push('Profile');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleChoosePhoto = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  deleteProfileImage = () => {
    this.setState({
      photo: null,
      profileImage: null,
    });
  };

  render() {
    const {photo} = this.state;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.next} onPress={this.onNext}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'orange'}}>
            수정
          </Text>
        </TouchableOpacity>
        {photo && (
          <Image source={{uri: photo.uri}} style={{width: 200, height: 200}} />
        )}
        {!photo && !this.state.profileImage && (
          <Image
            source={{
              uri:
                'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-256.png',
            }}
            style={{width: 200, height: 200}}
          />
        )}
        {!photo && this.state.profileImage && (
          <Image
            source={{
              uri: `${serverUrl}gallery` + this.state.profileImage,
            }}
            style={{width: 200, height: 200}}
          />
        )}
        <View style={{margin: 30}}>
          <Button
            title="Choose Photo"
            onPress={this.handleChoosePhoto}></Button>
        </View>
        <View>
          <Button title="초기화" onPress={this.deleteProfileImage}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  next: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
});