import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useQuery } from '@tanstack/react-query';
import { PaymentMethodData } from '../PaymentInfo/types';
import { FlashList } from '@shopify/flash-list';

interface CreditCardMapType {
  [key: string]: any;
}

const creditCardMap: CreditCardMapType = {
  visa: require('../../assets/visa.png'),
  mastercard: require('../../assets/mastercard.png'),
};

const AddCard: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        'https://koombea-stripe-backend.herokuapp.com/payment-sheet/cus_MSdHxwdsRVCDHc',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { setupIntent, ephemeralKey, customer } = await response.json();

      return {
        setupIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('first', error);
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const { setupIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        setupIntentClientSecret: setupIntent,
        merchantDisplayName: 'Merchant Name',
      });
      if (!error) {
        setLoading(true);
      } else {
        console.error('second', error);
      }
    } catch (error) {
      console.log('third', error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert(
        'Success',
        'Your payment method is successfully set up for future payments!',
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={creditCardMap[item.card.brand]} style={styles.image} />
      <Text>{`************${item.card.last4}`}</Text>
      <Text>{`${item.card.exp_month}/${item.card.exp_year}`}</Text>
    </View>
  );

  const fetchCards = async () => {
    try {
      const res = await fetch(
        `https://koombea-stripe-backend.herokuapp.com/customers/cus_MSdHxwdsRVCDHc`,
      );
      return await res.json();
    } catch (error) {
      console.error('error', error);
    }
  };

  const { data, isLoading, refetch } = useQuery<PaymentMethodData>(
    ['cards'],
    fetchCards,
  );

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  console.log(data?.paymentMethods.data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cards</Text>
      <View style={styles.list}>
        <FlashList
          onRefresh={refetch}
          refreshing={isLoading}
          renderItem={renderItem}
          data={data?.paymentMethods.data || []}
          estimatedItemSize={200}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        disabled={!loading}
        onPress={openPaymentSheet}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#635AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 43,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  listItem: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'lightgray',
  },
  btnWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default AddCard;
