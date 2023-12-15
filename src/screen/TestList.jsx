import {useState} from 'react';
import {Text, View} from 'react-native';

export default function TestList() {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState(null);

  return (
    <View>
      <Text>Test list</Text>
    </View>
  );
}
