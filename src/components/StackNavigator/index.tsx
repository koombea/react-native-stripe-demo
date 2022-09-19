import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import CustomerList from '../../screens/CustomerList';

const StackNavigator: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName='CustomerList'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CustomerList" component={CustomerList} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
