/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {getService} from '../services/api';
import {useAuth} from '../contexts/authContext';
import TestsCard from '../components/TestsCard';

export default function TestList() {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState(null);

  const {user} = useAuth();

  useEffect(() => {
    getAllTests();
  }, []);

  const getAllTests = async () => {
    try {
      const endpoint = `${user.role === 'admin' ? '/tests/admin' : '/tests'}`;
      const res = await getService(endpoint);
      setTests(res.tests);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>
        {user.role === 'admin' ? 'All Tests' : 'Your tests'}
      </Text>
      <View style={{gap: 10}}>
        {tests.map(test => (
          <TestsCard key={test?._id} test={test} />
        ))}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
