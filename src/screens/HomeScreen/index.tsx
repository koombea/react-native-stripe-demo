/* eslint-disable react-native/no-inline-styles */
import { CardField } from '@stripe/stripe-react-native';
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
  const addCardToStripe = async (cardDetails: Details) => {
    const res = await fetch('http://localhost:3000/create-payment-card', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        number: cardDetails.number,
        exp_month: cardDetails.expiryMonth,
        exp_year: cardDetails.expiryYear,
        cvc: cardDetails.cvc,
      }),
    });

    const test = await res.json();
    console.log(test);
  };

  return (
    <View style={styles.container}>
      <CardField
        dangerouslyGetFullCardDetails
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          cardDetails.complete && addCardToStripe(cardDetails);
          console.log('cardDetails', cardDetails);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
});

export default HomeScreen;
