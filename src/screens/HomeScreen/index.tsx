import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.h1}>Stripe Demo App</Text>
    </View>
    <View style={styles.middleContainer}>
      <Image source={require('../../assets/stripe.png')} style={styles.image} resizeMode={'contain'} />
    </View>
    <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => console.log('pressed')}
          style={styles.button}>
            <Text style={{color:'white', fontSize:16}}>LET'S ADD SOME CREDIT CARDS!</Text>
          </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
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
    color: '#635AFF',
    fontSize: 40,
  },
  image: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#635AFF',
    borderRadius: 5,
    padding: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
