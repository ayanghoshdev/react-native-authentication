import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {postService} from '../services/api';

const initailvalue = {
  name: '',
  description: '',
  price: '',
  location: '',
};
export default function CreateTestsForm({test, isUpdateForm = false, onClose}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    test
      ? {
          name: test.name,
          description: test.description,
          price: test.price.toString(),
          location: test.location,
        }
      : initailvalue,
  );

  const changeHandler = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const res = await postService('/tests', formData);
      if (!res.success) {
        throw new Error(res.message);
      }
      setFormData(initailvalue);
      ToastAndroid.show('Test created successfully', ToastAndroid.LONG);
      setLoading(false);
      onClose();
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setLoading(false);
    }
  };

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        value={formData.name}
        onChangeText={value => changeHandler('name', value)}
        placeholder="Name"
      />
      <TextInput
        style={[Styles.input, Styles.textArea]}
        multiline={true}
        value={formData.description}
        onChangeText={value => changeHandler('description', value)}
        placeholder="Description"
      />
      <TextInput
        style={Styles.input}
        inputMode="numeric"
        value={formData.price}
        onChangeText={value => changeHandler('price', value)}
        placeholder="Price"
      />
      <TextInput
        style={Styles.input}
        value={formData.location}
        onChangeText={value => changeHandler('location', value)}
        placeholder="Location"
      />
      <Pressable
        style={Styles.button}
        disabled={loading}
        onPress={submitHandler}>
        <Text style={Styles.text}>
          {loading ? '...' : isUpdateForm ? 'Update' : 'Create'}
        </Text>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 15,
    backgroundColor: '#708fff',
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
