import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../../components/StackNavigator/navigatorParamList';
const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        <Image
          source={require('../../assets/stripe.png')}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text style={styles.h1}>Stripe Demo App</Text>
        <Text style={styles.h2}>
          In this application you can experiment Stripe's functionalities to add
          credit cards and see them listed on your screen.
        </Text>
        <Text style={styles.h2}>To add a card</Text>
        <Text style={styles.steps}>
          1. Press the add button on the next screen and fill the information in
          Stripe's form modal.
        </Text>
        <Text style={styles.steps}>
          2. Check if the card was successfully added on the list.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCard')}
          style={styles.button}>
          <Text style={styles.buttonText}>LET'S ADD SOME CREDIT CARDS!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 16,
  },
  middleContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    margin: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    alignItems: 'center',
    width: '100%',
  },
  h1: {
    color: '#373737',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    marginTop: 20,
    color: '#2e2e2e',
    fontSize: 16,
  },
  steps: {
    marginTop: 20,
    color: '#2e2e2e',
    fontSize: 16,
  },
  image: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#635AFF',
    borderRadius: 30,
    padding: 20,
    marginBottom: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
