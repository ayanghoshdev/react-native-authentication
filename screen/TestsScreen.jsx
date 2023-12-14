import React, {ScrollView, StyleSheet, Text, View} from 'react-native';
import CreateTestsForm from '../components/CreateTestsForm';

export default function TestsScreen() {
  return (
    <ScrollView>
      <View style={Styles.container}>
        <Text style={Styles.heading}>Create a Test</Text>
        <CreateTestsForm />
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 50,
    paddingVertical: 50,
  },
  heading: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
});
