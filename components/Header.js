import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {icons, ratioWidth, ratioHeight, COLORS, FONTS} from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ground', value: '0'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
  ]);

  return (
    <View style={styles.header_container}>
      <View style={styles.header}>
        {/* User section */}
        <View style={styles.user_section}>
          <View style={styles.icon_section}>
            <TouchableOpacity style={styles.icon}>
              <Image
                source={icons.programmer}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.greeting}>
            <Text style={styles.main_text}>Hi, User</Text>
            <Text style={styles.secondary_text}>
              Building tracker is running now!
            </Text>
          </View>
        </View>
        {/* Notification section */}
        <View>
          <TouchableOpacity>
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={styles.noti_icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.floor_container}>
        <Text style={styles.floor_text}>Floor</Text>
        <DropDownPicker
          style={styles.drop_down}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={styles.drop_down_item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Header
  header_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 900 * ratioWidth,
  },
  user_section: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon_section: {
    marginRight: 29 * ratioWidth,
    backgroundColor: COLORS.button_primary,
    borderRadius: 25 * ratioWidth,
  },
  icon: {
    width: ratioWidth * 128,
    height: ratioHeight * 128,
  },
  greeting: {
    justifyContent: 'space-between',
  },
  main_text: {
    ...FONTS.h2,
    color: COLORS.heading,
  },
  secondary_text: {
    ...FONTS.h5,
    color: COLORS.heading,
  },
  noti_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
  },

  // Floor
  floor_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 600 * ratioWidth,
    marginTop: 39 * ratioHeight,
  },
  floor_text: {
    ...FONTS.h4,
    color: COLORS.heading,
    marginRight: 20,
  },
  drop_down: {
    width: 550 * ratioWidth,
    height: 75 * ratioHeight,
  },
  drop_down_item: {
    width: 550 * ratioWidth,
    height: 75 * ratioHeight,
  },
});

export default Header;
