/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {useAuth} from '../contexts/authContext';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getService} from '../services/api';
import socket from '../../utils/socket';

function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useAuth();

  const [notifications, setNotifications] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (user.role === 'admin') {
        getAllNotifications();
      }
    }, []),
  );
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });
    socket.on('new-notification', data => {
      // console.log(data);
      setNotifications(prev => [...prev, data]);
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const res = await getService('/notifications/tests');
      setNotifications(res.notifications);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message);
      console.log(error.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    // console.log('logout clicked');
    try {
      setLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
      setLoading(false);
      ToastAndroid.show('Logout success', ToastAndroid.LONG);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Fail to logout', ToastAndroid.LONG);
    }
  };
  // console.log(loading);
  return (
    <View style={Styles.container}>
      <Pressable disabled={loading} onPress={logout} style={Styles.logoutbtn}>
        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>
          Logout
        </Text>
      </Pressable>
      <Text style={Styles.heading}>
        {user.role === 'admin' ? 'Admin' : 'User'}
      </Text>
      {user.role === 'admin' ? (
        <Pressable
          style={Styles.button}
          onPress={() => navigation.navigate('Notifications')}>
          <Text style={Styles.text}>See notifications</Text>

          {notifications?.length > 0 && (
            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 5,
                color: '#ffffff',
                backgroundColor: 'red',
                borderRadius: 50,
                paddingHorizontal: 7,
                fontSize: 18,
              }}>
              {notifications.length}
            </Text>
          )}
        </Pressable>
      ) : (
        <Pressable
          style={Styles.button}
          onPress={() => navigation.navigate('CreateTest')}>
          <Text style={Styles.text}>Create your test here</Text>
        </Pressable>
      )}
      <Pressable
        style={Styles.button}
        onPress={() => navigation.navigate('TestList')}>
        <Text style={Styles.text}>
          {user.role === 'admin' ? 'see all tests' : 'my tests'}
        </Text>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    position: 'relative',
  },
  heading: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
  button: {
    width: '50%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#708fff',
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
  },

  logoutbtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
export default HomeScreen;
