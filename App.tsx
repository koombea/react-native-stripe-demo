import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
import { Linking } from 'react-native';
const queryClient = new QueryClient();
const App = () => {
  const [publishableKeyForStripe, setPublishableKeyForStripe] = useState<
    string | null
  >();
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);
  
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
        <StripeProvider publishableKey={publishableKeyForStripe || ''} merchantIdentifier={'com.koombea.stripeApp'}>
          <StackNavigator />
        </StripeProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
