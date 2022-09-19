import React from 'react';
import { Text, SafeAreaView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { PaymentMethod, PaymentMethodData } from './types';


interface PaymentInfoProps {
  customerId: string;
}

interface CreditCardMapType {
  [key: string]: any;
}

const creditCardMap: CreditCardMapType = {
  visa: require('../../assets/visa.png'),
  mastercard: require('../../assets/mastercard.png'),
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({customerId}) => {

  const fetchCards = async () => {
    try {
      const res = await fetch(`https://koombea-stripe-backend.herokuapp.com/customers/${customerId}`);
      return await res.json();
    } catch (error) {
      console.error('error', error);
    }
  };

  const {data, isLoading, refetch} = useQuery<PaymentMethodData>(['cards'], fetchCards);
  
  const renderItem = ( item: PaymentMethod ) => {
    return (
      <SafeAreaView style={styles.list}>
        <Image source={creditCardMap[item.card.brand]} style={styles.image} />
        <Text>{`${item.card.exp_month}/${item.card.exp_year}`}</Text>
        <Text>{`************${item.card.last4}`}</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
    {isLoading && (
          <ActivityIndicator />
      )}
        {data && data.paymentMethods.data.length !== 0 ? (
          <>
          <FlashList
            onRefresh={refetch}
            refreshing={isLoading}
            data={data.paymentMethods.data}
            renderItem={({ item }) => renderItem(item)}
            estimatedItemSize={200} />
            </>
        ): (
          <Text>No cards</Text>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  list: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    marginLeft: 10,
    borderBottomColor: 'lightgray',
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'lightblue',
  },
  image: {
    width: 50,
    height: 50,
  }
});
export default PaymentInfo;