import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {COLORS, FONTS, icons, ratioWidth, ratioHeight} from '../../constants';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Table, Row, Rows} from 'react-native-table-component';

import {Header} from '../../components';
import Element from './Element';

import {BaseController} from '../../data';

const History = ({navigation}) => {
  //Date data
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(
    false,
  );
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);

  const getDate = date => {
    let dateString = date.toString();
    dateString = dateString.split(' ');
    dateString = dateString.slice(0, 5);
    dateString[0] = dateString[0] + ',';
    dateString[3] = dateString[3] + ',';

    return dateString.join(' ');
  };

  //Table Data
  const tableHead = ['Date', 'Value'];
  const [tableData, setTableData] = useState(null);

  //Utilities
  const [isTableVisible, setTableVisibility] = useState(false);
  const [isIndicatorVisible, setIndicatorVisibility] = useState(false);
  const [selectedElement, setSelectedElement] = useState(0);

  const displayTable = async () => {
    setIndicatorVisibility(true);
    const controller = new BaseController();
    let data = await controller.fetchHistory(fromDate, toDate, selectedElement);
    if (data.length === 0) {
      showAlert('No data found');
      setTableVisibility(false);
    } else {
      setTableData(data);
      setTableVisibility(true);
    }
    setIndicatorVisibility(false);
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

  const getIndicator = () => {
    return (
      isIndicatorVisible && (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )
    );
  };

  const showAlert = msg => {
    Alert.alert('Error', msg, [{text: 'OK'}]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* Main section */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.main_section}>
          {/* Title */}
          <Text style={styles.title}>History</Text>
          <View style={styles.element_container}>
            <TouchableOpacity
              onPress={() => {
                setSelectedElement(0);
              }}>
              <Element
                name="Temperature"
                color={COLORS.darkgreen}
                backgroundColor={COLORS.lightgreen}
                icon={icons.thermometer}
                isSelected={selectedElement === 0}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedElement(1);
              }}>
              <Element
                name="Noise"
                color={COLORS.darkblue}
                backgroundColor={COLORS.lightblue}
                icon={icons.noise}
                isSelected={selectedElement === 1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedElement(2);
              }}>
              <Element
                name="Gas density"
                color={COLORS.darkred}
                backgroundColor={COLORS.lightred}
                icon={icons.gas}
                isSelected={selectedElement === 2}
              />
            </TouchableOpacity>
          </View>
          {/* From Date Picker */}
          <View style={styles.date_picker}>
            <Text style={styles.text}>From</Text>
            <View>
              <TouchableOpacity
                onPress={() => setFromDatePickerVisibility(true)}
                style={styles.date_picker_button}>
                <Text style={styles.date}>{getDate(fromDate)}</Text>
                <DateTimePickerModal
                  date={fromDate}
                  isVisible={isFromDatePickerVisible}
                  mode="datetime"
                  onConfirm={value => {
                    setFromDatePickerVisibility(false);
                    setFromDate(value);
                    setToDate(value);
                  }}
                  onCancel={() => setFromDatePickerVisibility(false)}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* To Date Picker */}
          <View style={styles.date_picker}>
            <Text style={styles.text}>To</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  !toDate && setToDate(new Date());
                  setToDatePickerVisibility(true);
                }}
                style={styles.date_picker_button}>
                <Text style={styles.date}>
                  {toDate ? getDate(toDate) : null}
                </Text>
                <DateTimePickerModal
                  date={fromDate}
                  isVisible={isToDatePickerVisible}
                  mode="datetime"
                  onConfirm={value => {
                    if (value < fromDate) {
                      showAlert('To Date must larger than From Date');
                    } else {
                      setToDate(value);
                    }
                    setToDatePickerVisibility(false);
                  }}
                  onCancel={() => setToDatePickerVisibility(false)}
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
            {getIndicator()}
            {getTable()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 20,
    marginBottom: 50 * ratioHeight,
  },

  scrollView: {
    marginBottom: 50,
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

  //Element container
  element_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
