import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './src/screens/HomeScreen';

const queryClient = new QueryClient();

const App = () => {
  const [publishableKeyForStripe, setPublishableKeyForStripe] = useState<
    string | null
  >();

  useEffect(() => {
    const getPublishableKey = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/publishable-key`);
        const { publishableKey } = await res.json();
        setPublishableKeyForStripe(publishableKey);
      } catch (error) {
        console.error('error', error);
      }
    };
    getPublishableKey();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider publishableKey={publishableKeyForStripe || ''}>
        <HomeScreen />
      </StripeProvider>
    </QueryClientProvider>
  );
};

export default App;
