// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// class Camera extends Component {
//   render() {
//     return (
//       <RNCamera
//         style={{width: 200, height: 200}}
//         type={RNCamera.Constants.Type.back}
//         captureAudio={false}
//       />
//     )
//   }
// }

// export default Camera;
// 'use strict';
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
      // data = `${data}, "type": 'image/jpg'`
      console.log(data);
      // const temp = 'wer'
      // if (data) {
      //   const result = await CameraRoll.saveToCameraRoll(data.uri)(data.uri);
      //   console.log('result', result);
      // }

      var formData = new FormData();
      formData.append('file', data);
      console.log(formData);
      fetch('http://10.0.2.2:8080/gallery/saveImg/', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          //   // Authorization: `Token ${this.state.authToken}`,
        },
      })
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

// AppRegistry.registerComponent('App', () => ExampleApp);
export default ExampleApp;
