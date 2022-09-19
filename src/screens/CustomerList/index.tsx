import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { NavigatorParamList } from '../../components/StackNavigator/navigatorParamList';
import { Customer, CustomerData } from './types';


interface customerListProps {
  setCustomerId: (customerId: string) => void;
}
const CustomerList: React.FC<customerListProps> = ({setCustomerId}) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
  const fetchCustomers = async () => {
    try {
      const res = await fetch('https://koombea-stripe-backend.herokuapp.com/customers');
      return  await res.json();
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleItemPress = (id: string) => {
    setCustomerId(id);
    navigation.navigate('PaymentInfo');
  }

  const renderItem = ( item: Customer ) => {
    return (
      <SafeAreaView style={styles.list}>
        <TouchableOpacity onPress={() => handleItemPress(item.id)}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  const {data, isLoading, refetch} = useQuery<CustomerData>(['customers'], fetchCustomers);
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
            <ActivityIndicator />
        )}
          {data && (
            <FlashList
              onRefresh={refetch}
              refreshing={isLoading}
              data={data.customers?.data}
              renderItem={({ item }) => renderItem(item)}
              estimatedItemSize={200} />
          )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.2,
    marginLeft: 10,
    borderBottomColor: 'lightgray',
  }
});

export default CustomerList;