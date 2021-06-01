import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, ratioWidth, ratioHeight} from '../../constants';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Table, Row, Rows} from 'react-native-table-component';

import {Header} from '../../components';

const History = ({navigation}) => {
  //Date data
  const today = new Date();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const getDate = date => {
    let dateString = date.toString();
    dateString = dateString.split(' ');
    dateString = dateString.slice(0, 5);
    dateString[0] = dateString[0] + ',';
    dateString[3] = dateString[3] + ',';

    return dateString.join(' ');
  };

  //Table Data
  const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
  const tableData = [
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', '456\n789'],
    ['a', 'b', 'c', 'd'],
  ];

  const [isTableVisible, setTableVisibility] = useState(false);
  const displayTable = () => {
    setTableVisibility(true);
  };
  const getTable = () => {
    return (
      isTableVisible && (
        <View style={styles.table_container}>
          <ScrollView vertical={true}>
            <Table borderStyle={styles.border}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.table_head}
              />
              <Rows data={tableData} textStyle={styles.table_text} />
            </Table>
          </ScrollView>
          <TouchableOpacity color={COLORS.primary} style={styles.button}>
            <Text style={styles.button_text}>Export</Text>
          </TouchableOpacity>
        </View>
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* Main section */}
      <View style={styles.main_section}>
        {/* Title */}
        <Text style={styles.title}>History</Text>

        {/* From Date Picker */}
        <View style={styles.date_picker}>
          <Text style={styles.text}>From</Text>
          <View>
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)}
              style={styles.date_picker_button}>
              <Text style={styles.date}>{getDate(fromDate)}</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={value => {
                  setDatePickerVisibility(false);
                  setFromDate(value);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* To Date Picker */}
        <View style={styles.date_picker}>
          <Text style={styles.text}>To</Text>
          <View>
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)}
              style={styles.date_picker_button}>
              <Text style={styles.date}>{getDate(toDate)}</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={value => {
                  setDatePickerVisibility(false);
                  setToDate(value);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            color={COLORS.primary}
            onPress={displayTable}
            style={styles.button}>
            <Text style={styles.button_text}>Find</Text>
          </TouchableOpacity>

          {/* Table compoment */}
          {getTable()}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 20,
  },

  main_section: {width: 900 * ratioWidth, marginTop: 15},
  title: {
    ...FONTS.h2,
    color: COLORS.title_building,
    marginBottom: 15,
  },

  text: {
    ...FONTS.h4,
    marginBottom: 5,
  },

  date_picker_button: {
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
  },
  date: {
    ...FONTS.h4,
    fontFamily: 'Roboto-Bold',
  },

  table_container: {
    padding: 16,
    paddingTop: 15,
    backgroundColor: '#fff',
    width: 900 * ratioWidth,
    height: 750 * ratioHeight,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  table_text: {margin: 6, textAlign: 'center'},
  table_head: {
    margin: 6,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  border: {borderWidth: 2, borderColor: '#c8e1ff'},

  // Button
  button: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    width: 250 * ratioWidth,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: COLORS.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});

export default History;
