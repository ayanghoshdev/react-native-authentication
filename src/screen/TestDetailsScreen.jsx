import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View, SafeAreaView} from 'react-native';
import {useAuth} from '../contexts/authContext';
import {getService, pathService} from '../services/api';
import {Picker} from '@react-native-picker/picker';

export default function TestDetailsScreen({route}) {
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();
  const {testId} = route.params;

  useEffect(() => {
    getTestDetails();
  });

  const getTestDetails = async () => {
    try {
      const res = await getService(`/tests/${testId}`);
      if (res.success) {
        setTestDetails(res.test);
        setLoading(false);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      ToastAndroid.show(error.message, 2000);
    }
  };

  // update status function
  const updateHandler = async selectedItem => {
    try {
      const res = await pathService(`/tests/${testId}`, {status: selectedItem});
      if (res.success) {
        ToastAndroid.show('Status updated', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const getStatusColor = () => {
    return testDetails.status === 'pending'
      ? '#FFA500'
      : testDetails.status === 'approved'
      ? '#008F02'
      : '#FF0000';
  };

  return (
    <SafeAreaView style={Styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{gap: 10}}>
          <View style={Styles.section}>
            <Text style={Styles.sectionTitle}>Name: </Text>
            <Text style={Styles.values}>{testDetails.name}</Text>
          </View>
          <View style={Styles.section}>
            <Text style={Styles.sectionTitle}>Description: </Text>
            <Text style={Styles.values}>{testDetails.description}</Text>
          </View>
          <View style={Styles.section}>
            <Text style={Styles.sectionTitle}>Price: </Text>
            <Text style={Styles.values}>₹{testDetails.price}</Text>
          </View>
          <View style={Styles.section}>
            <Text style={Styles.sectionTitle}>Location: </Text>
            <Text style={Styles.values}>{testDetails.location}</Text>
          </View>
          {user.role === 'admin' && (
            <View style={Styles.section}>
              <Text style={Styles.sectionTitle}>Test status:</Text>
              <Picker
                style={[{width: 200, color: getStatusColor()}]}
                selectedValue={testDetails.status}
                onValueChange={updateHandler}>
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="Approved" value="approved" />
                <Picker.Item label="Rejected" value="rejected" />
              </Picker>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'balck',
    width: 120,
  },
  values: {
    textTransform: 'capitalize',
    padding: 0,
    fontSize: 16,
  },
});
