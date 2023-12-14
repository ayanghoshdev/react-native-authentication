import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>This is home Screen</Text>
      <Pressable
        style={Styles.button}
        onPress={() => navigation.navigate('Tests')}>
        <Text style={Styles.text}>Create your test here</Text>
      </Pressable>
      <Pressable
        style={Styles.button}
        onPress={() => navigation.navigate('Notifications')}>
        <Text style={Styles.text}>See notifications</Text>
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
  },
});
export default HomeScreen;
