import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {useAuth} from '../contexts/authContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useAuth();

  const logout = async () => {
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
        </Pressable>
      ) : (
        <Pressable
          style={Styles.button}
          onPress={() => navigation.navigate('Tests')}>
          <Text style={Styles.text}>Create your test here</Text>
        </Pressable>
      )}
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
