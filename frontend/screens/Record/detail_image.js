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
// const serverUrl = 'http://10.0.2.2:8080/';
const serverUrl = 'http://j3a410.p.ssafy.io/api/';

export default class DetatilImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: this.props.route.params.imageId,
      image: this.props.route.params.image,
      picture: this.props.route.params.picture,
      dateTime: this.props.route.params.pictureDate,
      position: [120, 130, 300, 300],
    };
  }
  onBack = () => {
    this.props.navigation.navigate('Record');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <View style={styles.detailArea}>
          <View style={styles.detailHeader}>
            {/* <Icon
              name="arrow-back"
              onPress={this.onBack}
              style={styles.backBtn}></Icon> */}
            <View style={styles.chartDaybox}>
              <Text style={styles.chartDaytxt}>
                {this.state.dateTime.year}년 {this.state.dateTime.month}월{' '}
                {this.state.dateTime.date}일
              </Text>
            </View>
          </View>
          <ScrollView style={styles.imageBody}>
            <Image
              style={styles.image}
              source={{
                uri: `${serverUrl}gallery` + this.state.image,
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: this.state.position[0],
                top: this.state.position[1],
                width: this.state.position[2] - this.state.position[0],
                height: this.state.position[3] - this.state.position[1],
                borderWidth: 2,
                borderColor: '#2bff32',
              }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    borderBottomWidth: 1,
    backgroundColor: '#fca652',
  },
  haru: {
    fontSize: 30,
    fontFamily: 'BMJUA',
    color: '#fff',
  },
  detailArea: {
    margin: 1,
  },
  detailHeader: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },
  backBtn: {
    fontSize: 30,
  },
  imageBody: {},
  image: {
    height: width,
    position: 'relative',
    zIndex: 0,
  },
  // date
  chartDayicon: {
    fontSize: 50,
  },
  chartDaybox: {
    // width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  chartDaytxt: {
    fontSize: 20,
    margin: 10,
  },
});
