# React Native Stripe Demo

### Description
This is an app built to demonstarte how to connect Stripe to your Koombea React Native project.

### Get started steps

- Create a stripe account [here](https://dashboard.stripe.com/register).
- This integration requires endpoints on your server that talk to the Stripe API. You can use [this git repo](https://github.com/koombea/mobile-code-samples/tree/main/React%20Native/Stripe/Backend) to test your work locally.


### Initialize stripe
To initialize Stripe in your React Native app, either wrap your payment screen with the StripeProvider component, or use the initStripe initialization method. Only the API publishable key in publishableKey is required. The following example shows how to initialize Stripe using the StripeProvider component.
```js 
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="YOU_CAN_GET_THIS_FROM_THE_API"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      // Your app code here
    </StripeProvider>
  );
}
```
### Further Documentation
Once stripe has been initializated please use the following documentation resources for help:
- [Official Stripe Docs](https://stripe.com/docs/payments/accept-a-payment?platform=react-native&ui=payment-sheet#stripe-initialization)
- [Official Stripe API Docs](https://stripe.com/docs/api)
- [Stripe React Native NPM](https://github.com/stripe/stripe-react-native/#readme)
