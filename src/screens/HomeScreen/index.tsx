import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserDataForm } from '../../components/UserDataForm';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <UserDataForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});

export default HomeScreen;
