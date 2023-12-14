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

export default function SignupScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const changeHandler = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      const res = await postService('/users/signup', formData);
      if (res.success) {
        ToastAndroid.show('signup success', ToastAndroid.LONG);
      } else {
        throw new Error(res.error);
      }
      await AsyncStorage.setItem('token', JSON.stringify(res.token));
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>sign up</Text>
      <View style={Styles.inputgroup}>
        <TextInput
          onChangeText={text => changeHandler('name', text)}
          value={formData.name}
          style={Styles.input}
          placeholder="Name"
        />
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
          title="sign up"
          style={Styles.button}>
          <Text style={Styles.text}>{loading ? '...' : 'Sign up'}</Text>
        </Pressable>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text>Already have an accoutn?</Text>
          <Text onPress={() => navigation.navigate('Login')}>Login</Text>
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
