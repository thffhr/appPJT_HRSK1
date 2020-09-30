import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated,
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

      offset: 0,
      topHeight: 200, // min height for top pane header
      bottomHeight: 200, // min height for bottom pane header,
      deviceHeight: Dimensions.get('window').height,
      isDividerClicked: false,

      pan: new Animated.ValueXY(),
    };
  }
  onNext = () => {
    this.props.navigation.push('CreateArticle', {
      selected: this.state.selected,
    });
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the Y position offset when touch start
      onPanResponderGrant: (e, gestureState) => {
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: true,
        });
      },

      // When we drag the divider, set the bottomHeight (component state) again.
      onPanResponderMove: (e, gestureState) => {
        this.setState({
          bottomHeight:
            gestureState.moveY > this.state.deviceHeight - 40
              ? 40
              : this.state.deviceHeight - gestureState.moveY,
          offset: e.nativeEvent.pageY,
        });
      },

      onPanResponderRelease: (e, gestureState) => {
        // Do something here for the touch end event
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: false,
        });
      },
    });
  }

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
        <Animated.View
          style={[
            styles.selected,
            {minHeight: 40, flex: 1},
            {height: this.state.topHeight},
          ]}>
          <Text style={{color: 'white', fontSize: 50}}>
            {this.state.selected}
          </Text>
        </Animated.View>
        <View
          style={[
            styles.description,
            this.state.isDividerClicked
              ? {backgroundColor: '#666'}
              : {backgroundColor: '#e2e2e2'},
          ]}
          {...this._panResponder.panHandlers}>
          <Text style={{color: '#08ceff'}}>사진에서 선택</Text>
        </View>
        <Animated.View
          style={[
            {backgroundColor: 'white', minHeight: 40},
            {height: this.state.bottomHeight},
          ]}>
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
        </Animated.View>
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
