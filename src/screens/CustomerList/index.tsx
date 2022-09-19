import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from '@react-navigation/native';

const CustomerList: React.FC = () => {
  const navigation = useNavigation();
  const fetchCustomers = async () => {
    try {
      const res = await fetch('https://koombea-stripe-backend.herokuapp.com/customers');
      const customers = await res.json();
      return customers;
    } catch (error) {
      console.error('error', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('Home');
  }
  const renderItem = ( item: any ) => {
    console.log('item', item);
    return (
      <SafeAreaView style={styles.list}>
        <Text>{item.name}</Text>
      </SafeAreaView>
    )
  }


  const {data, isLoading} = useQuery(['customers'], fetchCustomers);
  return (
    <SafeAreaView style={styles.container}>
    {isLoading && (
          <ActivityIndicator />
      )}
        {data && (
          <>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Customers</Text>
            <TouchableOpacity onPress={() => handlePress()}>
            <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
          <FlashList
            data={data.customers.data}
            renderItem={({ item }) => renderItem(item)}
            estimatedItemSize={200} />
            </>
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
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'lightblue',
  }
});

export default CustomerList;