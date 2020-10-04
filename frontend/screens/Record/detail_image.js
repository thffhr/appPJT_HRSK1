import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';

const {width, height} = Dimensions.get('screen');
const serverUrl = 'http://10.0.2.2:8080/';

export default class DetatilImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: this.props.route.params.imageId,
      image: this.props.route.params.image,
      dateTime: this.props.route.params.dateTime,
    };
  }
  onBack = () => {
    this.props.navigation.navigate('Record');
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <View style={styles.detailArea}>
          <View style={styles.detailHeader}>
            <Icon
              name="arrow-back"
              onPress={this.onBack}
              style={styles.backBtn}></Icon>
            <Text> 년 월 일</Text>
          </View>
          <View style={styles.imageBody}>
            <Image
              style={styles.image}
              source={{
                uri: `${serverUrl}gallery` + this.state.image,
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFBE6',
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
  detailArea: {
    margin: 1,
  },
  detailHeader: {
    flexDirection: 'row',
  },
  backBtn: {
    fontSize: 30,
  },
  imageBody: {},
  image: {
    height: width,
  },
});
