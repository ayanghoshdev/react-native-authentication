import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {INFOICON} from '../images';
import {useNavigation} from '@react-navigation/native';

export default function ({test}) {
  const navigation = useNavigation();

  return (
    <View style={Styles.testCard}>
      <Text style={Styles.testTitle}>{test?.name.slice(0, 30)}...</Text>
      <Pressable
        onPress={() =>
          navigation.navigate('TestDetails', {
            testId: test?._id,
          })
        }
        style={Styles.infoBtn}>
        <Text style={Styles.text}>info</Text>
        <Image style={Styles.icon} source={INFOICON} />
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  testCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#171717',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  testTitle: {
    fontSize: 15,
    fontWeight: '400',
    textTransform: 'capitalize',
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
