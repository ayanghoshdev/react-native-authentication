import {useEffect, useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {getService} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await getService('/notifications/tests', {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      setNotifications(res.notifications);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message);
      console.log(error.message);
    }
  };

  return (
    <View>
      <Text>All notifications</Text>
      {!loading &&
        notifications.map(item => <Text key={item._id}>{item.test.name}</Text>)}
    </View>
  );
}
