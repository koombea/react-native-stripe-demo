import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState, createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
const queryClient = new QueryClient();
const App = () => {
  const [publishableKeyForStripe, setPublishableKeyForStripe] = useState<
    string | null
  >();
  
  useEffect(() => {
    const getPublishableKey = async () => {
      try {
        const res = await fetch(
          'https://koombea-stripe-backend.herokuapp.com/publishable-key',
        );
        const { publishableKey } = await res.json();
        setPublishableKeyForStripe(publishableKey);
      } catch (error) {
        console.error('error', error);
      }
    };
    getPublishableKey();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StripeProvider publishableKey={publishableKeyForStripe || ''}>
          <StackNavigator />
        </StripeProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
