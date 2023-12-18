import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {getService} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoficationsCard from '../components/NotificationCard';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotifications();
  });

  const getAllNotifications = async () => {
    try {
      const res = await getService('/notifications/tests');
      setNotifications(res.notifications);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message);
      console.log(error.message);
    }
  };

  if (!loading && notifications.length < 1) {
    return (
      <Text
        style={{
          textTransform: 'capitalize',
          textAlign: 'center',
          fontSize: 20,
          marginVertical: 20,
        }}>
        You don't have any notification
      </Text>
    );
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>All notifications</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        notifications.map(item => (
          <NoficationsCard key={item._id} notification={item} />
        ))
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
  },
});
