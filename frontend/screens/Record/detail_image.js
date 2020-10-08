import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      onCaption: false,
    };
  }
  onBack = () => {
    this.props.navigation.navigate('Record');
  };
  onCaption = () => {
    this.setState({
      onCaption: !this.state.onCaption,
    });
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
            {/* <View style={styles.btnBox}> */}
            {!this.state.onCaption && (
              <Icon
                style={styles.onCaption}
                onPress={this.onCaption}
                name="eye"
              />
            )}
            {this.state.onCaption && (
              <Icon
                style={styles.onCaption}
                onPress={this.onCaption}
                name="eye-off"
              />
            )}
            {/* </View> */}
          </View>
          <ScrollView style={styles.imageBody}>
            <Image
              style={styles.image}
              source={{
                uri: `${serverUrl}gallery` + this.state.image,
              }}
            />

            {this.state.onCaption && (
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
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.015,
  },
  backBtn: {
    fontSize: 30,
  },
  imageBody: {},
  image: {
    height: width,
    position: 'relative',
  },
  // date
  chartDayicon: {
    fontSize: 50,
  },

  chartDaybox: {
    // width: '50%',
    // borderWidth: 1,
    // borderRadius: 100,
    // textAlign: 'center',
    // alignItems: 'center',
  },
  chartDaytxt: {
    fontSize: 20,
    margin: 10,
  },

  // caption
  onCaption: {
    // backgroundColor: '#2bff32',
    // borderRadius: 10,
    fontSize: 30,
  },
  offCaption: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  captionTxt: {
    fontSize: 25,
    fontFamily: 'BMJUA',
    textAlign: 'center',
  },
  // btnBox: {
  //   width: 70,
  // },
});
