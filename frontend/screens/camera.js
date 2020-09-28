import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');

const sizeCircle = 50;

const halfCircle = sizeCircle / 2;

class ExampleApp extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}></TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      var data = await this.camera.takePictureAsync(options);
      data.type = 'image/jpeg';
      // data.name = 'image'
      console.log('data', data);
      // if (data) {
      //   const result = await CameraRoll.saveToCameraRoll(data.uri);
      //   console.log('result', result);
      // }

      var formData = new FormData();
      formData.append('file', data);
      // formData.append('file', {
      //   uri: data.uri,
      //   type: 'image/jpg',
      //   name: 'img.jpg',
      // })
      console.log('FormData', formData)
      fetch('http://10.0.2.2:8080/gallery/saveImg/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Token ${this.state.authToken}`,
        },
      })
        // .then(response => response.json())
        .then((response) => {
          console.log('보내기 성공');
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    width: width,
    height: width,
  },
  capture: {
    // flex: 0,
    backgroundColor: '#F1C40F',
    width: sizeCircle,
    height: sizeCircle,
    borderRadius: halfCircle,
    // padding: 30,
    paddingHorizontal: 20,
    // alignSelf: 'center',
    margin: 100,
    // borderColor: 'black',
    // borderWidth: 2,
    // borderStyle: 'dashed',
  },
});

export default ExampleApp;
