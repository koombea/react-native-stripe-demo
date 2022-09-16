import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './src/screens/HomeScreen';

const queryClient = new QueryClient();

const App = () => {
  const [publishableKeyForStripe, setPublishableKeyForStripe] = React.useState<
    string | null
  >();

  useEffect(() => {
    const getPublishableKey = async () => {
      const res = await fetch('http://localhost:3000/publishableKey', {
        headers: { 'Content-Type': 'application/json' },
      });
      const { publishableKey } = await res.json();
      setPublishableKeyForStripe(publishableKey);
    };
    getPublishableKey();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider
        publishableKey={publishableKeyForStripe || ''}
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <SafeAreaView style={styles.container}>
          <HomeScreen />
        </SafeAreaView>
      </StripeProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
