import { CardField } from '@stripe/stripe-react-native';
import React from 'react';
import { StyleSheet, View, ViewStyle, Dimensions } from 'react-native';

interface CardStripeFormProps {
  style?: ViewStyle;
  setCard: any;
}

export const CardStripeForm: React.FC<CardStripeFormProps> = ({
  style,
  setCard,
}) => {
  return (
    <View style={[style, styles.container]}>
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
          backgroundColor: '#fff',
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          cardDetails.complete && setCard(cardDetails);
        }}
      />
    </View>
  );
};
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: width - 40,
    
  },
});
