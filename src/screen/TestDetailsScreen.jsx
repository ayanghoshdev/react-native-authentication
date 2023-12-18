import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import {useAuth} from '../contexts/authContext';
import {getService, pathService} from '../services/api';
import {Picker} from '@react-native-picker/picker';
import CreateTestsForm from '../components/CreateTestsForm';

export default function TestDetailsScreen({route}) {
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

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
      <ScrollView>
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
            <View style={Styles.section}>
              <Text style={Styles.sectionTitle}>Test status:</Text>
              {user.role === 'admin' ? (
                <Picker
                  style={[{width: 200, color: getStatusColor()}]}
                  selectedValue={testDetails.status}
                  onValueChange={updateHandler}>
                  <Picker.Item label="Pending" value="pending" />
                  <Picker.Item label="Approved" value="approved" />
                  <Picker.Item label="Rejected" value="rejected" />
                </Picker>
              ) : (
                <Text
                  style={[
                    {color: getStatusColor(), textTransform: 'capitalize'},
                  ]}>
                  {testDetails.status}
                </Text>
              )}
            </View>
            {user.role === 'user' && (
              <Pressable
                style={Styles.buttonStyle}
                onPress={() => setIsUpdate(true)}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}>
                  Update Test
                </Text>
              </Pressable>
            )}
            {isUpdate && (
              <CreateTestsForm
                test={testDetails}
                isUpdateForm={true}
                onClose={setIsUpdate}
              />
            )}
          </View>
        )}
      </ScrollView>
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
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'black',
  },
  values: {
    textTransform: 'capitalize',
    padding: 0,
    fontSize: 16,
  },
});
