import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardStripeForm } from '../CardStripeForm';

export const UserDataForm: React.FC = () => {
  const [card, setCard] = useState<Details | null>(null);

  const handleSubmit = async () => {
    try {
      const paymentMethod = await addCardToStripe(card);
      console.log('payment', paymentMethod.paymentMethod.id);
      const customer = await createCustomer(paymentMethod.paymentMethod.id);
      console.log('customer', customer);
    } catch (error) {
      console.log(error);
    }
  };

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

  const createCustomer = async (paymentMethod: string) => {
    const res = await fetch(`${process.env.API_URL}/create-customer`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        name: formik.values.name,
        email: formik.values.email,
        phone: formik.values.phone,
        address: formik.values.address,
        payment_method: paymentMethod || '',
      }),
    });
    return res.json();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      },
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fill it at your own risk...</Text>
      </View>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholderTextColor="lightgray"
          placeholder="Name..."
          style={styles.text_input}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholderTextColor="lightgray"
          placeholder="Email..."
          style={styles.text_input}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
        />
      </View>
      <View>
        <Text style={styles.label}>Street</Text>
        <TextInput
          placeholderTextColor="lightgray"
          placeholder="Street..."
          style={styles.text_input}
          value={formik.values.address.line1}
          onChangeText={formik.handleChange('address.line1')}
        />
      </View>
      <View>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          placeholderTextColor="lightgray"
          placeholder="Phone..."
          style={styles.text_input}
          value={formik.values.phone}
          onChangeText={formik.handleChange('phone')}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.in_a_row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            placeholderTextColor="lightgray"
            placeholder="City..."
            style={styles.text_input}
            value={formik.values.address.city}
            onChangeText={formik.handleChange('address.city')}
          />
        </View>
        <View style={styles.in_a_row}>
          <Text style={styles.label}>State</Text>
          <TextInput
            placeholderTextColor="lightgray"
            placeholder="State..."
            style={styles.text_input}
            value={formik.values.address.state}
            onChangeText={formik.handleChange('address.state')}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.in_a_row}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            placeholderTextColor="lightgray"
            placeholder="Country..."
            style={styles.text_input}
            value={formik.values.address.country}
            onChangeText={formik.handleChange('address.country')}
          />
        </View>
        <View style={styles.in_a_row}>
          <Text style={styles.label}>PostalCode</Text>
          <TextInput
            placeholderTextColor="lightgray"
            placeholder="PostalCode..."
            style={styles.text_input}
            value={formik.values.address.postal_code}
            onChangeText={formik.handleChange('address.postal_code')}
          />
        </View>
      </View>
      <CardStripeForm setCard={setCard} />
      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text_input: {
    height: 40,
    margin: 12,
    borderColor: '#cecece',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    marginLeft: 10,
    color: '#474747',
  },
  in_a_row: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    margin: 8,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
