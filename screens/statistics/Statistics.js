import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {icons, COLORS, FONTS, ratioWidth, ratioHeight} from '../../constants';

import {Header} from '../../components';
import Element from './Element';

import {
  BaseController,
  TempController,
  NoiseController,
  GasController,
} from '../../data';

import {LineChart} from 'react-native-chart-kit';

const Statistics = ({route, navigation}) => {
  const username = route.params.username;
  const [selectedElement, setSelectedElement] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  const getButtonStyle = id => {
    if (id === selectedButton) {
      return {...styles.button, ...styles.button_active};
    } else {
      return {...styles.button, ...styles.button_not_active};
    }
  };

  const getTextStyle = id => {
    if (id === selectedButton) {
      return {...styles.button_text, ...styles.text_active};
    } else {
      return {...styles.button_text, ...styles.text_not_active};
    }
  };

  const [data, setData] = useState(null);
  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    //Get data for statistic
    async function getStatistic() {
      let controller = new BaseController();
      await controller
        .fetchStatistics(selectedElement, selectedButton)
        .then(value => {
          setData(value);
          setIndicator(false);
        });
    }
    getStatistic();
  }, [selectedElement, selectedButton]);

  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FAFAFA',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(30,174,152, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header hasNotificationButton={false} />

      {/* Main section */}
      <View style={styles.main_section}>
        {/* Title */}
        <Text style={styles.title}>Statistics</Text>

        {/* Element container */}
        <View style={styles.element_container}>
          <TouchableOpacity
            onPress={() => {
              setIndicator(true);
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
              setIndicator(true);
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
              setIndicator(true);
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

        {/* Button group */}
        <View style={styles.button_group}>
          <View style={styles.button_wrapper}>
            <TouchableOpacity
              style={getButtonStyle(0)}
              onPress={() => {
                setIndicator(true);
                setSelectedButton(0);
              }}>
              <Text style={getTextStyle(0)}>Day</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={getButtonStyle(1)}
              onPress={() => {
                setIndicator(true);
                setSelectedButton(1);
              }}>
              <Text style={getTextStyle(1)}>Week</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={getButtonStyle(2)}
              onPress={() => {
                setIndicator(true);
                setSelectedButton(2);
              }}>
              <Text style={getTextStyle(2)}>Month</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart section */}
        <ScrollView vertical={true}>
          {indicator ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <LineChart
              data={data}
              width={915 * ratioWidth} // from react-native
              height={550 * ratioHeight}
              yAxisSuffix={
                selectedElement === 0
                  ? '\u00b0C'
                  : selectedElement === 1
                  ? 'dB'
                  : 'mg/m³'
              }
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              fromZero={true}
              style={styles.chart}
            />
          )}
        </ScrollView>
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

  main_section: {
    width: 900 * ratioWidth,
    marginTop: 15,
  },

  title: {
    ...FONTS.h2,
    color: COLORS.title_building,
    marginBottom: 15,
  },

  element_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Button group
  button_group: {
    marginVertical: 15,
    width: 900 * ratioWidth,
  },

  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: 250 * ratioWidth,
    height: 90 * ratioHeight,
    borderRadius: 50 * ratioWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  button_active: {
    backgroundColor: COLORS.primary,
  },
  text_active: {
    color: COLORS.white,
  },

  button_not_active: {
    backgroundColor: COLORS.white,
  },
  text_not_active: {
    color: COLORS.black,
  },

  // Chart

  chart: {
    marginVertical: 10,
    marginTop: 50,
  },
});

export default Statistics;
