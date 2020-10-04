import React, {Component, useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  // ProgressBarAndroid,
  Animated,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  Arrow,
} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

const {width, height} = Dimensions.get('screen');

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const serverUrl = 'http://10.0.2.2:8080/';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일

//////////////////////////////////////////////
let animation = useRef(new Animated.Value(0));
const [progress, setProgress] = useState(0);
useInterval(() => {
  if (progress < 100) {
    setProgress(progress + 1);
  }
}, 1000);

useEffect(() => {
  Animated.timing(animation.current, {
    toValue: progress,
    duration: 100,
  }).start();
}, [progress]);

const width = animation.current.interpolate({
  inputRange: [0, 100],
  outputRange: ['0%', '100%'],
  extrapolate: 'clamp',
});
//////////////////////////////////////////////
export default class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btn1_color: '#FCA652',
      btn2_color: '#FFFBE6',
      btn3_color: '#FFFBE6',
      active: 'btn1',
      selectedDate: {
        date: null,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
        total: 0,
      },
      pictures: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
      },
      nextDays: {},
      dateTime: {
        year: year,
        month: month,
        date: date,
        day: day,
      },
      authToken: '',
    };
  }
  async componentDidMount() {
    // you might want to do the I18N setup here
    this.setState({
      authToken: await AsyncStorage.getItem('auth-token'),
    });
    this.onFetch();
  }
  onBtn1 = () => {
    this.setState({
      btn1_color: '#FCA652',
      btn2_color: '#FFFBE6',
      btn3_color: '#FFFBE6',
      active: 'btn1',
    });
  };
  onBtn2 = () => {
    this.setState({
      btn1_color: '#FFFBE6',
      btn2_color: '#FCA652',
      btn3_color: '#FFFBE6',
      active: 'btn2',
    });
  };
  onBtn3 = async () => {
    const authToken = await AsyncStorage.getItem('auth-token');
    this.setState({
      btn1_color: '#FFFBE6',
      btn2_color: '#FFFBE6',
      btn3_color: '#FCA652',
      active: 'btn3',
    });
    fetch(`${serverUrl}gallery/getCalendar/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          nextDays: response,
        });
        var tempObject = {};
        for (var key of Object.keys(this.state.nextDays)) {
          tempObject = {
            ...tempObject,
            [key]: {
              marked: true,
              dotColor: '#FCA652',
            },
          };
        }
        this.setState({
          newDaysObject: tempObject,
        });
      })
      .catch((err) => console.error(err));
  };
  onMacro = (day) => {
    if (Object.keys(this.state.nextDays).includes(day.dateString)) {
      this.setState({
        selectedDate: {
          ...this.state.selectedDate,
          date: day.dateString,
          breakfast: this.state.nextDays[day.dateString][0],
          lunch: this.state.nextDays[day.dateString][1],
          dinner: this.state.nextDays[day.dateString][2],
          snack: this.state.nextDays[day.dateString][3],
          total: this.state.nextDays[day.dateString][4],
        },
      });
    } else {
      this.setState({
        selectedDate: {
          ...this.state.selectedDate,
          date: day.dateString,
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          snack: 0,
          total: 0,
        },
      });
    }
  };
  getEndOfDay = (y, m) => {
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      case 2:
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          return 29;
        } else {
          return 28;
        }
      default:
        return 0;
    }
  };

  yesterday = (year, month, date) => {
    if (date !== 1) {
      date--;
    } else {
      month--;
      if (month === 0) {
        month = 12;
        year--;
      }
      date = this.getEndOfDay(year, month);
    }
    this.onFetch(year, month, date);
  };

  tomorrow = (year, month, date) => {
    var endDate = this.getEndOfDay(year, month);
    if (date !== endDate) {
      date++;
    } else {
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
      date = 1;
    }
    this.onFetch(year, month, date);
  };

  onFetch = (year, month, date) => {
    // this.setState({
    //     dateTime: {
    //         ...dateTime,
    //         year = year,
    //         month = month,
    //         date = date,
    //     }
    //   })
    //   var newYear = this.pad(`${year}`, 4);
    //   var newMonth = this.pad(`${month}`, 2);
    //   var newDate = this.pad(`${date}`, 2);
    //   var sendDate = `${newYear}-${newMonth}-${newDate}`;
    //   fetch('http://10.0.2.2/gallery/getCalendar/', {
    //     method: 'GET',
    //     body: sendDate,
    //     headers: {
    //         Authorization: `Token ${this.state.authToken}`,
    //         'Content-Type': 'application/json',
    //     },
    //   })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => console.error(err))
  };

  pad = (n, width) => {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  };

  getDayInfo = () => {
    const YMD = `${this.state.dateTime.year}-${this.state.dateTime.month}-${this.state.dateTime.day}`;
    fetch('http://10.0.2.2:8080/gallery/getCalender/', {
      method: 'GET',
      body: YMD,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.state.authToken}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  onDetailImage = (idx) => {
    this.props.navigation.push('DetailImage');
    console.log(idx);
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.haru}>하루세끼</Text>
        </View>
        <View style={styles.btnList}>
          <TouchableOpacity
            onPress={this.onBtn1}
            style={[styles.btn, {borderBottomColor: this.state.btn1_color}]}>
            <Text style={styles.btnText}>사진</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onBtn2}
            style={[styles.btn, {borderBottomColor: this.state.btn2_color}]}>
            <Text style={styles.btnText}>기록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onBtn3}
            style={[styles.btn, {borderBottomColor: this.state.btn3_color}]}>
            <Text style={styles.btnText}>달력</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          {this.state.active == 'btn2' && ( // chart
            <View style={styles.chartArea}>
              {/* 여기는 요일 */}
              <View style={styles.chartDay}>
                <Icon
                  name="chevron-back-outline"
                  style={styles.chartDayicon}
                  onPress={this.goYesterday}></Icon>
                <View style={styles.chartDaybox}>
                  <Text style={styles.chartDaytxt}>
                    {month}월 {date}일 (
                    {LocaleConfig.locales['fr'].dayNames[day]})
                  </Text>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  style={styles.chartDayicon}
                  onPress={this.goNextday}></Icon>
              </View>
              {/* 여기는 칼로리 차트 */}
              <Text style={styles.caltxt}>1000/1500</Text>
              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([styles.progressBarFill],
                    {backgroundColor: '#8BED4F', width})
                  }
                />
              </View>
              {/* 여기는 영양소 */}
              <View style={styles.cal}>
                <Text>아침</Text>
                <View>
                  <Text>밥</Text>
                </View>
                <View>
                  <Text>밥</Text>
                </View>
                <View>
                  <Text>밥</Text>
                </View>
              </View>
            </View>
          )}
          {this.state.active == 'btn1' && !this.state.selectedImage && (
            <View style={styles.pictureBox}>
              {Object.entries(this.state.pictures).map(([key, value], i) => {
                return (
                  <TouchableOpacity
                    style={styles.imageBox}
                    key={i}
                    onPress={() => {
                      this.onDetailImage(i);
                    }}>
                    <Text>
                      {key} {value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {this.state.active == 'btn3' && ( // calendar
            <View style={styles.calendarArea}>
              <CalendarList
                horizontal={true}
                pagingEnabled={true}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2020-01-01'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2022-12-31'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {
                  this.onMacro(day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {
                  console.log('month changed', month);
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => <Arrow />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(addMonth) => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={true}
                // Disable right arrow. Default = false
                disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter.
                // renderHeader={(date) => {/*Return JSX*/}}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
                // markedDates={{
                // '2020-10-05': {marked: true},
                // }}
                theme={{
                  todayTextColor: '#FCA652',
                }}
                markedDates={this.state.newDaysObject}
              />
              {Object.keys(this.state.nextDays).includes(
                this.state.selectedDate.date,
              ) && (
                <View style={styles.dateBox}>
                  <Text>{this.state.selectedDate.date}</Text>
                  {Object.entries(this.state.selectedDate)
                    .filter(([key, value]) => key !== 'date')
                    .map(([key, value], i) => {
                      return (
                        <View style={styles.macroBox} key={i}>
                          <Text>
                            {key} {value}
                          </Text>
                          <Text>kcal</Text>
                        </View>
                      );
                    })}
                </View>
              )}
            </View>
          )}
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
  btnList: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    width: '33.3%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
  },
  chartArea: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  chartDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartDayicon: {
    fontSize: 50,
  },
  chartDaybox: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartDaytxt: {
    fontSize: 20,
    margin: 10,
  },
  calchart: {},
  caltxt: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
  progressBar: {
    height: 20,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  calendarArea: {
    width: '100%',
    marginBottom: 30,
  },
  // btn1
  pictureBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageBox: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'orange',
    margin: 5,
  },
  dateBox: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  macroBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
