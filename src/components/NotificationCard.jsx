import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {INFOICON} from '../images';
import {useNavigation} from '@react-navigation/native';
import {deleteService} from '../services/api';

export default function NoficationsCard({notification}) {
  const navigation = useNavigation();

  const clickHandler = async () => {
    try {
      deleteService(`/notifications/tests/${notification._id}`);
      navigation.navigate('TestDetails', {testId: notification?.test?._id});
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={[Styles.card, Styles.dropShadow]}>
      <Text style={Styles.text}>
        {notification?.test?.name.slice(0, 25)}...
      </Text>
      {/* <Text>{notification?.test?.price}</Text> */}
      <Pressable onPress={clickHandler} style={Styles.infoBtn}>
        <Text style={Styles.text}>info</Text>
        <Image style={Styles.icon} source={INFOICON} />
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '80%',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  dropShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    height: 15,
    width: 15,
  },
  infoBtn: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
