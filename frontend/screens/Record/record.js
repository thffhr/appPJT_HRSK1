import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda, LocaleConfig, Arrow} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const breakfast = {key: 'breakfast', color: '#ffa696'};
const lunch = {key: 'lunch', color: '#d7ff96'};
const dinner = {key: 'dinner', color: '#96faff'};
const snack = {key: 'snack', color: '#e196ff'};

const nextDays = [
  ['2020-10-01', 100, 200, 300, 400],
  ['2020-10-15', 600, 500, 400, 330],
  ['2020-10-30', 10, 20, 30, 40],
  ['2020-10-31', 20, 60, 70, 50],
];
let newDaysObject = {};
for (var i = 0; i < nextDays.length; i++) {
  nextDays[i].forEach((day) => {
    newDaysObject = {
      ...newDaysObject,
      [day]: {
        marked: true,
        dotColor: '#FCA652',
      }
    };
  });
}
// nextDays.forEach(() => {
//   newDaysObject = {
//     ...newDaysObject,
//     [day]: {
//       marked: true,
//       dotColor: '#FCA652',
//     }
//   };
// });

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   day: 1,      // day of month (1-31)
    //   month: 1,    // month of year (1-12)
    //   year: 2017,  // year
    //   // timestamp,   // UTC timestamp representing 00:00 AM of this date
    //   dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
      btn1_color: '#FFFBE6',
      btn2_color: '#FFFBE6',
      btn3_color: '#FCA652',
      active: 'btn3',
      // record = [
      //   ['2020-10-06', 200, 300, 500, 200], // date, breakfast, lunch, dinner, snack 
      //   ['2020-10-10', 200, 300, 500, 200],
      //   ['2020-10-20', 200, 0, 500, 200],
      // ],
    };
  };
  
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
  onBtn3 = () => {
    this.setState({
      btn1_color: '#FFFBE6',
      btn2_color: '#FFFBE6',
      btn3_color: '#FCA652',
      active: 'btn3',
    });
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
                // Initially visible month. Default = Date()
                // current={'2020-10-01'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2020-01-01'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2022-12-31'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {console.log('selected day', day)}}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => (<Arrow/>)}
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
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
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
                markedDates={{
                  '2020-10-05': {marked: true}
                }}
                theme={{
                  todayTextColor: '#FCA652',
                  // dotColor: '#FCA652',
                  // backgroundColor: '#FFFBE6',
                }}
                markedDates={newDaysObject}

              />
            </View>
          )}
        </View>
      </ScrollView>
    )
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

})

export default Record;