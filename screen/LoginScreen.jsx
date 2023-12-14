import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {postService} from '../services/api';
import {useAuth} from '../contexts/authContext';

export default function LoginScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {setIsLoggedIn} = useAuth();

  const changeHandler = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      const res = await postService('/users/login', formData);
      if (res.success) {
        ToastAndroid.show('signup success', ToastAndroid.LONG);
      } else {
        throw new Error(res.error);
      }
      AsyncStorage.setItem('token', JSON.stringify(res.token)).then(() => {
        setLoading(false);
        setIsLoggedIn(true);
        navigation.navigate('Home');
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Log in</Text>
      <View style={Styles.inputgroup}>
        <TextInput
          onChangeText={text => changeHandler('email', text)}
          value={formData.email}
          style={Styles.input}
          placeholder="Email"
        />
        <TextInput
          onChangeText={text => changeHandler('password', text)}
          value={formData.password}
          style={Styles.input}
          placeholder="Password"
        />
        <Pressable
          disabled={loading}
          onPress={submitHandler}
          title="Login"
          style={Styles.button}>
          <Text style={Styles.text}>{loading ? '...' : 'Login'}</Text>
        </Pressable>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text>Don't have an accoutn?</Text>
          <Text onPress={() => navigation.navigate('Signup')}>Sign up</Text>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '30%',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 30,
    textTransform: 'capitalize',
  },
  inputgroup: {
    width: '70%',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
