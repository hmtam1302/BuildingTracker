import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {STYLE, ratioWidth, ratioHeight, COLORS, FONTS} from '../../constants';

import * as Progress from 'react-native-progress';

const Element = ({name, color, icon, value}) => {
  const unit =
    name === 'Temperature' ? '\u00b0C' : name === 'Noise' ? 'dB' : 'mg/m³';
  console.log(value);
  const styles = StyleSheet.create({
    container: {
      marginVertical: 45 * ratioHeight,
      width: 950 * ratioWidth,
      height: 350 * ratioHeight,
      borderColor: color,
      borderWidth: 3,
      borderRadius: 25,
      justifyContent: 'center',
      padding: 20,
    },
    content_section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    // Content 1
    content1: {},
    name: {
      ...FONTS.h3,
      color: color,
      paddingBottom: 5,
    },

    information: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    progress_bar: {
      paddingBottom: 5,
    },

    text_section: {
      flexDirection: 'row',
      paddingBottom: 5,
    },
    content_type: {
      ...FONTS.h5,
      fontFamily: 'Roboto-BoldItalic',
      color: color,
    },
    content: {
      ...FONTS.h5,
      fontFamily: 'Roboto-Italic',
      color: color,
    },

    // Content 2
    content2: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 128 * ratioWidth,
      height: 128 * ratioWidth,
    },
    value: {
      ...FONTS.h4,
      color: color,
      paddingTop: 5,
    },

    // Detail
    detail: {
      ...FONTS.h5,
      color: color,
      fontFamily: 'Roboto-Bold',
    },
    detail_text: {
      ...FONTS.h5,
      color: color,
      fontFamily: 'Roboto-Italic',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content_section}>
        {/* Content 1 */}
        <View style={styles.content1}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.progress_bar}>
            <Progress.Bar
              progress={value.current / value.limit}
              width={475 * ratioWidth}
              height={50 * ratioHeight}
              borderRadius={25}
              color={
                value.status === 'Normal'
                  ? COLORS.normal
                  : value.status === 'Alert'
                  ? COLORS.alert
                  : COLORS.danger
              }
            />
          </View>
          <View style={styles.information}>
            <View style={styles.text_section}>
              <Text style={styles.content_type}>Status: </Text>
              <Text style={styles.content}>{value.status}</Text>
            </View>
            <View style={styles.text_section}>
              <Text style={styles.content_type}>Limit: </Text>
              <Text style={styles.content}>
                {value.limit}
                {unit}
              </Text>
            </View>
          </View>
        </View>

        {/* Content 2 */}
        <View style={styles.content2}>
          <Image source={icon} resizeMode="contain" style={styles.image} />
          <Text style={styles.value}>
            {value.current}
            {unit}
          </Text>
        </View>
      </View>

      {/* Detail */}
      <View style={styles.text_section}>
        <Text style={styles.detail}>Detail:</Text>
        <Text style={styles.detail_text}>{value.detail}</Text>
      </View>
    </View>
  );
};

export default Element;
