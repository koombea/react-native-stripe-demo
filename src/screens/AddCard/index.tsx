import { useNavigation } from '@react-navigation/native';
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { CardStripeForm } from '../../components/CardStripeForm';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { NavigatorParamList } from '../../components/StackNavigator/navigatorParamList';

interface AddCardProps {
  customerId: string;
}

const AddCard: React.FC<AddCardProps> = ({customerId}) => {
  const [card, setCard] = useState<Details | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList>>();

  const addCardToStripe = async (cardDetails: Details | null) => {
    const res = await fetch(`${process.env.API_URL}/create-payment-card`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        number: cardDetails?.number,
        exp_month: cardDetails?.expiryMonth,
        exp_year: cardDetails?.expiryYear,
        cvc: cardDetails?.cvc,
      }),
    });

    return res.json();
  };
  const addCardToCustomer = async () => {
    const {paymentMethod} = await addCardToStripe(card);
    try {
      const res = await fetch(`https://koombea-stripe-backend.herokuapp.com/customers/${customerId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          paymentMethod: paymentMethod.id,
      })
    });
      return await res.json();
    } catch (error) {
      console.error('error', error);
    }
  };

  const handlePress = async () => {
    try {
    await addCardToCustomer();
    navigation.navigate('PaymentInfo');
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <CardStripeForm setCard={setCard}/>
      <View style={styles.btnWrapper}>
      <Button onPress={handlePress} title={'Add Card'}/>
      </View>
    </View>
    )
}

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