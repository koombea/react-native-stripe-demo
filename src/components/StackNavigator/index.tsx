import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import CustomerList from '../../screens/CustomerList';
import PaymentInfo from '../../screens/PaymentInfo';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AddCard from '../../screens/AddCard';
import { NavigatorParamList } from './navigatorParamList';

const Stack = createNativeStackNavigator<NavigatorParamList>();

const StackNavigator: React.FC = () => {
  
  const [customerId, setCustomerId] = useState('')
  const handleHeaderRightCustomerList = (route : RouteProp<NavigatorParamList>) => {
    let navigationName: keyof NavigatorParamList;
    if (route.name === 'CustomerList') {
      navigationName = 'Home';
    } else {
      navigationName = 'AddCard';
    }
    const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList>>();

    return (
      <TouchableOpacity onPress={() => navigation.navigate(navigationName)}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    );
  }
  return (
    <Stack.Navigator
    initialRouteName='CustomerList'
      screenOptions={{
        headerBackTitleVisible: true
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CustomerList" options={({ route }) => ({
        headerRight: () => handleHeaderRightCustomerList(route)
      })} >
        {() => <CustomerList setCustomerId={setCustomerId} />}
      </Stack.Screen>
      <Stack.Screen name="PaymentInfo" options={({ route }) => ({
        headerRight: () => handleHeaderRightCustomerList(route)
      })}>
        {() => <PaymentInfo customerId={customerId} />}
      </Stack.Screen>
      <Stack.Screen name="AddCard">
        {() => <AddCard customerId={customerId} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'lightblue',
    marginRight: 10,
  }
});

export default StackNavigator;
