import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, NotificationField} from './components';
import {UserController} from '../../data';

const Notification = ({route, navigation, status, element, time, isRead}) => {
  const username = route.params.username;
  const [isIndicatorVisible, setIndicatorVisibility] = useState(true);
  const [notifications, setNotifications] = useState(null);
  //Get notifications data
  React.useEffect(() => {
    const getNotifications = async () => {
      let response = await new UserController(username).getNotifications();
      let data = await response.json();
      if (data.hasOwnProperty('notifications')) {
        setNotifications(data.notifications);
      }
      setIndicatorVisibility(false);
    };
    getNotifications();
  }, [username]);

  //Mark notification as read
  const markAsRead = id => {
    new UserController(username).updateNotification(id);
    setNotifications(
      notifications.map(ele => (ele._id === id ? {...ele, isRead: true} : ele)),
    );
  };

  //Delete notification
  const deleteNotification = id => {
    new UserController(username).deleteNotification(id);
    setNotifications(notifications.filter(ele => ele._id !== id));
  };

  //Clear all notification
  const clearNotifications = () => {
    const userController = new UserController(username);
    notifications.map(ele => userController.deleteNotification(ele._id));
    setNotifications(null);
  };

  //Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(ele => {
        if (!ele.isRead) {
          new UserController(username).updateNotification(ele._id);
          return {...ele, isRead: true};
        } else {
          return ele;
        }
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Notification" navigation={navigation} />

      {/* Avatar */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* Notification fields */}
      <View style={styles.notification_container}>
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => clearNotifications()}>
            <Text style={styles.button_text}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => markAllAsRead()}>
            <Text style={styles.button_text}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        {isIndicatorVisible ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.notification_field_container}>
            <FlatList
              data={notifications}
              renderItem={({item}) => (
                <NotificationField
                  id={item._id}
                  status={item.status}
                  element={item.element}
                  time={item.time}
                  onMarkAsRead={markAsRead}
                  isRead={item.isRead}
                  onDelete={deleteNotification}
                />
              )}
              keyExtractor={item => item._id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },

  //Logo
  logo: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
  },

  //Notification fields
  notification_container: {
    width: SIZES.windowWidth - 20 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notification_field_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Button
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {},
  button_text: {
    fontSize: 30 * ratioHeight,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
    fontStyle: 'italic',
  },
});

export default Notification;
