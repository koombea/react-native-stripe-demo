import React, { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const AddCard: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
    const response = await fetch('https://koombea-stripe-backend.herokuapp.com/payment-sheet/cus_MSdHxwdsRVCDHc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { setupIntent, ephemeralKey, customer } = await response.json();

    return {
      setupIntent,
      ephemeralKey,
      customer,
    };
  } catch (error) {
     console.error('first', error) 
  }
  };

  const initializePaymentSheet = async () => {
    try {
    const {
      setupIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();
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
    console.log('third', error)
  }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your payment method is successfully set up for future payments!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaView>
      <Button
        disabled={!loading}
        title="Set up"
        onPress={openPaymentSheet}
      />
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
  btnWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AddCard;