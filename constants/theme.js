export const COLORS = {
  title_building: '#413C69',
  title_tracker: '#4A47A3',
  heading: '#46405C',
  link_text: '#658280',
  error: '#F10707',
  white: '#FFFFFF',
  black: '#000',
  primary: '#1eae98',
  secondary: '#CDCDCD',
  button_primary: '#1eae98',
  border_color: '#CBCBCB',

  grey: '#aaaaaa',

  darkgreen: '#184D47',
  darkblue: '#150E56',
  darkred: '#CF0000',

  lightgreen: '#BBFFB5',
  lightblue: '#CDCCFF',
  lightred: '#FFABAB',

  cyan: '#B7F4F0',

  normal: '#79d70f',
  alert: '#ffd31d',
  danger: '#d63447',
};

import {Dimensions} from 'react-native';

export const ratioWidth = Dimensions.get('window').width / 1080;
export const ratioHeight = Dimensions.get('window').height / 1920;

export const SIZES = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  padding: 15,
};

export const FONTS = {
  h1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 75 * ratioWidth,
  },
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 70 * ratioWidth,
  },
  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: 55 * ratioWidth,
  },
  h4: {
    fontFamily: 'Roboto-Bold',
    fontSize: 45 * ratioWidth,
  },
  h5: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30 * ratioWidth,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 25 * ratioWidth,
  },
  link: {
    fontFamily: 'Roboto-BoldItalic',
    color: COLORS.link_text,
  },
  error: {
    fontFamily: 'Roboto-Italic',
    color: COLORS.error,
  },
  title_primary: {
    color: COLORS.title_building,
  },
  title_secondary: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.title_building,
  },
};

export const STYLE = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: COLORS.border_color,
    borderRadius: 25,
  },
};
