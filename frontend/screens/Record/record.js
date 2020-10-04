import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  Arrow,
} from 'react-native-calendars';

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

// const breakfast = {key: 'breakfast', color: '#ffa696'};
// const lunch = {key: 'lunch', color: '#d7ff96'};
// const dinner = {key: 'dinner', color: '#96faff'};
// const snack = {key: 'snack', color: '#e196ff'};

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btn1_color: '#FFFBE6',
      btn2_color: '#FFFBE6',
      btn3_color: '#FCA652',
      active: 'btn1',
      selectedDate: {
        date: null,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
        total: 0,
      },
      nextDays: {},
      // newDaysObject: {},
      authToken: '',
    };
  }
  onBtn1 = () => {
    this.setState({
      btn1_color: 'orange',
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
  calendarArea: {
    width: '100%',
    marginBottom: 30,
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

export default Record;
